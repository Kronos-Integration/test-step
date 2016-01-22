/* jslint node: true, esnext: true */
"use strict";

/*
 * Almost every step test needs a monager mock. So this would be a general mock for it.
 */
const scopeReporter = require('scope-reporter'),
	service = require('kronos-service'),
	scopeDefinitions = require('./scopeDefinitions'),
	events = require('events');

// ---------------------------
// Create a mock manager
// ---------------------------
const sr = scopeReporter.createReporter(scopeDefinitions);
let steps = {};
let flows = {};
let interceptors = {};

const manager = Object.create(new events.EventEmitter(), {
	steps: {
		value: steps
	},
	flows: {
		value: flows
	},
	interceptors: {
		value: interceptors
	},
	scopeReporter: {
		value: sr
	}
});

manager.registerStep = manager.registerStepImplementation = function (si) {
	steps[si.name] = si;
};

manager.registerFlow = function (flow) {
	flows[flow.name] = flow;

	if (flow.autostart) {
		return flow.start();
	}

	return Promise.resolve(flow);
};

manager.getFlow = function (flowName) {
	return flows[flowName];
};

manager.getStepInstance = function (configuration) {
	const stepImpl = steps[configuration.type];
	if (stepImpl) {
		return stepImpl.createInstance(this, this.scopeReporter, configuration);
	}
	throw new Error(
		`Could not find the step implementation: '${configuration.type}'.\n
		Available types are: ${Object.keys(steps).join(',')}`
	);
};

/**
 * Creates a Interceptor instance for a given interceptor configuration.
 * The Interceptors type needs to be registered before it can be referenced in
 * the Interceptor configuration.
 * @param {Object} configuration. The 'type' key of the configuration will be used to find the interceptor.
 *                                The 'config' key data will be passed as config data to the Interecptor itslef.
 * @param {Object} owner. The owner of the interceptor to be created..
 * @return {Interceptor} ready for use
 * @throws if given Interceptor type is not registered
 */
manager.getInterceptorInstance = function (configuration, owner) {
	if (!configuration) {
		throw new Error(
			`Could not create an Interceptor without a configuration given.`
		);
	}

	if (!owner) {
		throw new Error(
			`Could not create an Interceptor without an owner given.`
		);
	}

	const InterceptorClass = interceptors[configuration.type];
	if (InterceptorClass) {
		return new InterceptorClass(owner, configuration.config);
	}
	throw new Error(
		`Could not find the InterceptorClass implementation: '${configuration.type}'.\nAvailable types are: ${Object.keys(interceptors).join(',')}`
	);
};


var configs = {};

/**
 * Returns a configuration object for the given key.
 * If the config does not exists it will return undefined.
 * @param key The key under the configuration was registered.
 * @param {Function} provideIfMissing callback to deliver the missing module if it is not already present
 * @return The registered configuration for the given key
 */
manager.configGet = function (key, provideIfMissing) {
	const c = configs[key];
	if (c === undefined && provideIfMissing) {
		this.configRegister(key, provideIfMissing(key));
		return configs[key];
	}
	return c;
};

/**
 * Registers an configuration object in the service manager.
 * If there is already registered under this key, it will be overwritten.
 * @param key A key used to identify the configuration.
 * @param config The configuration object to be stored.
 */
manager.configRegister = function (key, config) {
	configs[key] = config;
	manager.emit('configRegistered', key);
};

/**
 * Deletes the configuration registered under the given key
 * @param key The key identifying the config to be deleted
 */
manager.configDelete = function (key) {
	if (configs[key]) {
		delete configs[key];
	}
	manager.emit('configDeleted', key);
};

var services = {};

/**
 * Returns a service object for the given key.
 * If the service does not exists it will return undefined.
 * @param serviceName The name under the service was registered.
 * @param {Function} provideIfMissing callback to deliver the missing module if it is not already present
 * @return The registered service for the given key
 */
manager.serviceGet = function (serviceName, provideIfMissing) {
	const c = services[serviceName];
	if (c === undefined && provideIfMissing) {
		this.serviceRegister(serviceName, provideIfMissing(serviceName));
		return services[serviceName];
	}
	return c;
};

/**
 * Registers an service in the service manager.
 * If there is already registered under this serviceName, it will be overwritten.
 * Services can derive from already registered services values.name then references a former
 * registered service wich is used as a prototype for the new service
 * @param serviceName A name used to identify the service.
 * @param service The service object to be stored.
 * @return {Service} registered service
 */
manager.serviceRegister = function (serviceOrServiceName, values) {

	if (typeof serviceOrServiceName === 'string') {
		if (values.name) {
			const baseService = this.serviceGet(values.name);
			if (baseService === null) {
				console.log(`unable to find service: ${values.name}`);
			}
			console.log(`${serviceOrServiceName} using base bervice: ${values.name}`);

			serviceOrServiceName = service.createService(serviceOrServiceName, values, baseService);
		} else {
			serviceOrServiceName = service.createService(serviceOrServiceName, values);
		}
	}
	services[serviceOrServiceName.name] = serviceOrServiceName;
	manager.emit('serviceRegistered', serviceOrServiceName);

	return serviceOrServiceName;
};

/**
 * Declares (and registers) a derived service
 * @param {String} derivedFromServiceName
 * @param {String|Object} definition
 * @return {Service} declared service
 */
manager.serviceDeclare = function (derivedFromServiceName, definition) {
	const serviceName = typeof definition === 'string' ? definition : definition.name;

	let service = this.serviceGet(serviceName);

	if (!service) {
		const serviceConfig = Object.assign({}, definition, {
			name: derivedFromServiceName
		});

		service = this.serviceRegister(serviceName, serviceConfig);
	}

	return service;
};

/**
 * Deletes the service registered under the given serviceName
 * @param serviceName The name identifying the service to be deleted
 */
manager.serviceDelete = function (serviceName) {
	if (services[serviceName]) {
		delete services[serviceName];
	}
	manager.emit('serviceDeleted', serviceName);
};

/**
 * Load a flow from a file
 * @param {String} fileName
 * @return {Promise} of the loaded flow
 */
manager.loadFlowFromFile = function (fileName) {
	return new Promise(function (resolve, reject) {
		fs.readFile(fileName, {
			encoding: 'utf8'
		}, function (err, data) {
			if (err) {
				reject(err);
				return;
			}
			try {
				resolve(manager.registerFlow(this.getStepInstance(JSON.parse(data))));
			} catch (err) {
				reject(err);
				return;
			}
		});
	});
};

manager.registerModules = function (moduleNames) {
	try {
		moduleNames.forEach(
			name => {
				try {
					const m = require(name);
					if (m) {
						m.registerWithManager(this);
					} else {
						console.log(`error in ${name}`);
					}
				} catch (e) {
					console.log(e);
				}
			});
	} catch (e) {
		console.log(e);
	}
};

manager.registerInterceptor = function (interceptor) {
	const type = interceptor.type;

	if (interceptors[type]) {
		if (interceptors[type] === interceptors) {
			return;
		}
	}

	interceptors[type] = interceptor;
};

module.exports = manager;

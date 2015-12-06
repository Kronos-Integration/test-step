/* jslint node: true, esnext: true */
"use strict";

/*
 * Almost every step test needs a monager mock. So this would be a general mock for it.
 */
const scopeReporter = require('scope-reporter');
const events = require('events');
const scopeDefinitions = require('./scopeDefinitions');

// ---------------------------
// Create a mock manager
// ---------------------------
const sr = scopeReporter.createReporter(scopeDefinitions);
let steps = {};
let flows = {};

const manager = Object.create(new events.EventEmitter(), {
	steps: {
		value: steps
	},
	flows: {
		value: flows
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

var configs = {};

/**
 * Returns a configuration object for the given key.
 * If the config does not exists it will return undefined.
 * @param key The key under the configuration was registered.
 * @return The registered configuration for the given key
 */
manager.configGet = function (key) {
	return configs[key];
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

module.exports = manager;

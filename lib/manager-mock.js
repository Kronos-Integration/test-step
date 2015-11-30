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


module.exports = manager;

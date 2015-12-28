/* global describe, it, beforeEach */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should();

function checkStepStatic(manager, aStep, additionalAsserts) {
	describe('manager', function () {
		it('is present', function () {
			assert.equal(aStep.manager, manager);
		});
	});

	describe('state', function () {
		it('is stopped', function () {
			assert.equal(aStep.state, 'stopped');
		});
	});

	describe('type', function () {
		it('is defined', function () {
			assert.isDefined(aStep.type);
		});
	});

	describe('name', function () {
		it('is defined ', function () {
			assert.isDefined(aStep.name);
		});
	});

	if (additionalAsserts) {
		additionalAsserts();
	}
}

function checkStepLivecycle(manager, aStep, additionalAsserts) {
	const livecycle = {
		statesHistory: []
	};

	const stepStateChangedListener = function (step, oldState, newState) {
		livecycle.statesHistory.push({
			old: oldState,
			new: newState
		});

		console.log(`${JSON.stringify(livecycle.statesHistory)}`);
	};

	manager.addListener('stepStateChanged', stepStateChangedListener);

	if (!additionalAsserts) additionalAsserts = function (step, state, livecycle, done) {
		done();
	};

	it('can be stopped in stopped state', function (done) {
		aStep.stop().then(
			function (step) {
				try {
					assert.equal(aStep, step);
					assert.equal(aStep.state, 'stopped');
					additionalAsserts(aStep, 'stopped', livecycle, done);
				} catch (e) {
					done(e);
				}
			}, done);
	});

	it('can be started', function (done) {
		aStep.start().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'running');
				additionalAsserts(aStep, 'running', livecycle, function () {
					setTimeout(done, 100); // wait for some requests to pass through
				});
			} catch (e) {
				done(e);
			}
		}, done);
		assert.equal(aStep.state, 'starting');
	});

	it('can be started again', function (done) {
		aStep.start().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'running');
				additionalAsserts(aStep, 'running', livecycle, done);
			} catch (e) {
				done(e);
			}
		}, done);
		assert.equal(aStep.state, 'running');
	});

	it('and then stopped', function (done) {
		aStep.stop().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'stopped');
				additionalAsserts(aStep, 'stopped', livecycle, done);
			} catch (e) {
				done(e);
			}
		}, done);
		assert.equal(aStep.state, 'stopping');
	});

	it('and then stopped again', function (done) {
		aStep.stop().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'stopped');
				additionalAsserts(aStep, 'stopped', livecycle, done);
			} catch (e) {
				done(e);
			}
		}, done);
		assert.equal(aStep.state, 'stopped');
	});

	it('can be started while starting', function (done) {
		aStep.start().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'running');
				additionalAsserts(aStep, 'running', livecycle, function () {});
			} catch (e) {
				done(e);
			}
		}, done);

		aStep.start().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'running');
				additionalAsserts(aStep, 'running', livecycle, done);
			} catch (e) {
				done(e);
			}
		}, done);

		assert.equal(aStep.state, 'starting');
	});

	it('can be stopped while starting', function (done) {
		aStep.stop().then(
			function () {
				aStep.start();
				assert.equal(aStep.state, 'starting');
				aStep.stop().then(function (step) {
					try {
						assert.equal(aStep, step);
						assert.equal(aStep.state, 'stopped');
						done();
					} catch (e) {
						done(e);
					}
				}, done);
			}
		);
	});

	/*
		it('can be removed', function (done) {
			aStep.stop().then(aStep.remove().then(function (step) {
				try {
					assert.equal(aStep, step);
					assert.equal(aStep.state, 'removed');
					additionalAsserts(aStep, 'removed', livecycle, done);
				} catch (e) {
					done(e);
				}
			}, done));
});
*/

	manager.removeListener('stepStateChanged', stepStateChangedListener);
}


exports.checkStepStatic = checkStepStatic;
exports.checkStepLivecycle = checkStepLivecycle;

/* global describe, it, beforeEach */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should();

function checkStepStatic(manager, aStep, additionalAsserts) {
	describe('manager', function () {
		it('present', function () {
			assert.equal(aStep.manager, manager);
		});
	});

	describe('state', function () {
		it('stopped', function () {
			assert.equal(aStep.state, 'stopped');
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

	if (!additionalAsserts) additionalAsserts = function () {};

	it('can be stopped in stopped state', function (done) {
		aStep.stop().then(
			function (step) {
				try {
					assert.equal(aStep, step);
					assert.equal(aStep.state, 'stopped');
					additionalAsserts(aStep, 'stopped', livecycle);
					done();
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
				additionalAsserts(aStep, 'running', livecycle);
				setTimeout(done, 10); // wait for some requests to pass through
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
				additionalAsserts(aStep, 'running', livecycle);
				done();
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
				additionalAsserts(aStep, 'stopped', livecycle);
				done();
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
				additionalAsserts(aStep, 'stopped', livecycle);
				done();
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
				additionalAsserts(aStep, 'running', livecycle);
				//done();
			} catch (e) {
				done(e);
			}
		}, done);

		aStep.start().then(function (step) {
			try {
				assert.equal(aStep, step);
				assert.equal(aStep.state, 'running');
				additionalAsserts(aStep, 'running', livecycle);
				done();
			} catch (e) {
				done(e);
			}
		}, done);

		assert.equal(aStep.state, 'starting');
	});

	/*
	      aStep.remove().then(function (step) {
	        try {
	          assert.equal(aStep, step);
	          assert.equal(aStep.state, 'removed');
	          if (additionalAsserts) {
	            additionalAsserts(aStep, 'removed');
	          }
	          done();
	        } catch (e) {
	          done(e);
	        }
	      }, done);
	*/

	manager.removeListener('stepStateChanged', stepStateChangedListener);
}


exports.checkStepStatic = checkStepStatic;
exports.checkStepLivecycle = checkStepLivecycle;

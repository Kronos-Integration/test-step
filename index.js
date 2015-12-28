/* jslint node: true, esnext: true */
"use strict";

const StepTest = require('./tests/step_test');
const managerMock = require('./lib/manager-mock');

module.exports.checkStepStatic = StepTest.checkStepStatic;
module.exports.checkStepLivecycle = StepTest.checkStepLivecycle;

// Used for test. Each step nest needs a manager. This is a mockup used for testing steps
module.exports.managerMock = managerMock;

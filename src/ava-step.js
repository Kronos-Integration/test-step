async function dummy() {}

/**
 * @typedef {Object} Step
 */

/**
 * @typedef {Object} StepFactory
 */

/**
 * @typedef {Object} Owner
 */

/**
 * @callback StaticAsserts
 * @param {ava} t
 * @param {Step} instance
 */

/**
 * @callback LivecycleAsserts
 * @param {ava} t
 * @param {Step} instance
 * @param {string} state
 * @param {Object} livecycle
 * @param {string[]} livecycle.statesHistory
 */

/**
 * @param {ava} t
 * @param {StepFactory} Factory
 * @param {Object} config
 * @param {string} type
 * @param {Owner} owner
 * @param {StaticAsserts} additionalAsserts
 */
export async function stepTestStatic(
  t,
  Factory,
  config,
  type,
  owner,
  additionalAsserts = dummy
) {
  const instance = new Factory(config, owner);

  t.is(instance.state, 'stopped');
  t.is(instance.type, type);

  t.is(instance.endpoints !== undefined, true);

  await additionalAsserts(t, instance);
}

/**
 * @param {ava} t
 * @param {Step} step
 * @param {Owner} owner
 * @param {LivecycleAsserts} additionalAsserts
 */
export async function checkStepLivecycle(
  t,
  step,
  owner,
  additionalAsserts = dummy
) {
  const livecycle = {
    statesHistory: []
  };

  const stepStateChangedListener = (step, oldState, newState) => {
    livecycle.statesHistory.push({
      old: oldState,
      new: newState
    });
  };

  owner.addListener('stepStateChanged', stepStateChangedListener);

  await step.stop();

  t.is(step.state, 'stopped');
  await additionalAsserts(t, step, 'stopped', livecycle);

  await step.start();

  t.is(step.state, 'running');

  owner.removeListener('stepStateChanged', stepStateChangedListener);
}

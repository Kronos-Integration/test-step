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
 * @param {Object} livecycle
 * @param {string[]} livecycle.statesHistory
 */

/**
 * Run static (initialization) tests
 * @param {ava} t
 * @param {StepFactory} Factory
 * @param {Object} config
 * @param {Owner} owner
 * @param {string} type
 * @param {StaticAsserts} additionalAsserts
 */
export async function stepTestStatic(
  t,
  Factory,
  config,
  owner,
  type = undefined,
  additionalAsserts = dummy
) {
  const instance = new Factory(config, owner);

  t.is(instance.state, 'stopped');

  if (type !== undefined) {
    t.is(instance.type, type);
  }

  t.is(instance.endpoints !== undefined, true);

  await additionalAsserts(t, instance);
}

/**
 * Run livecycle tests
 * @param {ava} t
 * @param {Step} step
 * @param {Owner} owner
 * @param {LivecycleAsserts} additionalAsserts
 */
export async function stepTestLivecycle(
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
  await additionalAsserts(t, step, livecycle);

  await step.start();

  t.is(step.state, 'running');
  await additionalAsserts(t, step, livecycle);

  owner.removeListener('stepStateChanged', stepStateChangedListener);
}

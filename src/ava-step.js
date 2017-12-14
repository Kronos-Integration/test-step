async function dummy() {}

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

export async function checkStepLivecycle(
  t,
  owner,
  step,
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

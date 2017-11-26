async function dummy() {}

export async function stepTestStatic(
  t,
  Factory,
  config,
  type,
  manager,
  additionalAsserts = dummy
) {
  const instance = new Factory(config, manager);

  t.is(instance.manager, manager);
  t.is(instance.state, 'stopped');
  t.is(instance.type, type);

  t.is(instance.endpoints !== undefined, true);

  await additionalAsserts(t, instance);
}

export async function checkStepLivecycle(
  t,
  manager,
  aStep,
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

  manager.addListener('stepStateChanged', stepStateChangedListener);

  if (!additionalAsserts)
    additionalAsserts = (step, state, livecycle, done) => {
      done();
    };

  it('can be stopped in stopped state', done => {
    aStep.stop().then(step => {
      try {
        assert.equal(aStep, step);
        assert.equal(aStep.state, 'stopped');
        additionalAsserts(aStep, 'stopped', livecycle, done);
      } catch (e) {
        done(e);
      }
    }, done);
  });

  it('can be started', done => {
    aStep.start().then(step => {
      try {
        assert.equal(aStep, step);
        assert.equal(aStep.state, 'running');
        additionalAsserts(aStep, 'running', livecycle, e => {
          setTimeout(function() {
            done(e);
          }, 100); // wait for some requests to pass through
        });
      } catch (e) {
        done(e);
      }
    }, done);
    assert.equal(aStep.state, 'starting');
  });

  it('can be started again', done => {
    aStep.start().then(step => {
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

  it('and then stopped', done => {
    aStep.stop().then(step => {
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

  it('and then stopped again', done => {
    aStep.stop().then(step => {
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

  it('can be started while starting', done => {
    aStep.start().then(step => {
      try {
        assert.equal(aStep, step);
        assert.equal(aStep.state, 'running');
        additionalAsserts(aStep, 'running', livecycle, function() {});
      } catch (e) {
        done(e);
      }
    }, done);

    aStep.start().then(step => {
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

  it('can be stopped while starting', done => {
    aStep.stop().then(function() {
      aStep.start();
      assert.equal(aStep.state, 'starting');
      aStep.stop().then(step => {
        try {
          assert.equal(aStep, step);
          assert.equal(aStep.state, 'stopped');
          done();
        } catch (e) {
          done(e);
        }
      }, done);
    });
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

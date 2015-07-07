import Ember from 'ember';
import sinon from 'sinon';
import { initialize } from 'ember-cli-tag-manager/initializers/pageview';
import { module, test } from 'qunit';

var container, application;

module('Unit | Initializer | pageview', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();

      // Make sure we are logging pageviews and events.
      sinon.stub(application, 'get').withArgs('LOG_TRACKING').returns(true);
    });
  }
});

test('it notifies the Google Analytics server of a pageview', function(assert) {
  initialize(container, application);
  window.ga = sinon.spy();

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    sinon.stub(subject, 'get').withArgs('url').returns('/');
    subject.notifyGoogleAnalytics();
  });

  Ember.run.next(function() {
    assert.ok(window.ga.calledOnce);
    assert.ok(window.ga.calledWith('send', 'pageview', { page: '/', title: '/' }));
    called();
  });
});

test('it logs output to the console', function(assert) {
  initialize(container, application);
  Ember.Logger.info = sinon.spy();

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    sinon.stub(subject, 'get').withArgs('url').returns('/');
    subject.notifyGoogleAnalytics();
  });

  Ember.run.next(function() {
    assert.ok(Ember.Logger.info.calledOnce);
    assert.ok(Ember.Logger.info.calledWith('Tracking Google Analytics pageview:', '/'));
    called();
  });
});

test('it notifies inspectlet of a pageview', function(assert) {
  initialize(container, application);
  window.__insp = { push: sinon.spy() };

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    subject.notifyInspectlet();
  });

  Ember.run.next(function() {
    assert.ok(window.__insp.push.calledOnce);
    assert.ok(window.__insp.push.calledWith(['virtualPage']));
    called();
  });
});

test('it notifies optimizely of a pageview', function(assert) {
  initialize(container, application);
  window.optimizely = { push: sinon.spy() };

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    subject.notifyOptimizely();
  });

  Ember.run.next(function() {
    assert.ok(window.optimizely.push.calledOnce);
    assert.ok(window.optimizely.push.calledWith(['activate']));
    called();
  });
});

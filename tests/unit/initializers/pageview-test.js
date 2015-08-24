import Ember from 'ember';
import sinon from 'sinon';
import { initialize } from '../../../initializers/pageview';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | pageview', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

test('it notifies the Google Analytics server of a pageview', function(assert) {
  initialize(registry, application);
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

test('it notifies Bing of a pageview', function(assert) {
  initialize(registry, application);
  window.uetq = { push: sinon.spy() };

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    subject.notifyBing();
  });

  Ember.run.next(function() {
    assert.ok(window.uetq.push.calledOnce);
    assert.ok(window.uetq.push.calledWith('pageLoad'));
    called();
  });
});

test('it notifies Facebook of a pageview', function(assert) {
  initialize(registry, application);
  window.fbq = sinon.spy();

  var subject = Ember.Router.create();
  var called = assert.async();

  Ember.run(function() {
    subject.notifyFacebook();
  });

  Ember.run.next(function() {
    assert.ok(window.fbq.calledOnce);
    assert.ok(window.fbq.calledWith('track', 'PageView'));
    called();
  });
});

test('it notifies Inspectlet of a pageview', function(assert) {
  initialize(registry, application);
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

test('it notifies Optimizely of a pageview', function(assert) {
  initialize(registry, application);
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

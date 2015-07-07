import Ember from 'ember';
import sinon from 'sinon';
import { initialize } from 'ember-cli-tag-manager/initializers/event';
import { module, test } from 'qunit';

var container, application;

module('Unit | Initializer | event', {
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

test('it notifies the Google Analytics server of an event', function(assert) {
  initialize(container, application);
  window.ga = sinon.spy();

  var ActionableObject = Ember.Object.extend(Ember.ActionHandler);
  var subject = ActionableObject.create();
  var called = assert.async();

  Ember.run(function() {
    subject.send('save');
    assert.ok(window.ga.called);
    assert.ok(window.ga.calledWith('send', 'event', 'button', 'click', 'save'));
    called();
  });
});

test('it logs output to the console', function(assert) {
  initialize(container, application);
  Ember.Logger.info = sinon.spy();

  var ActionableObject = Ember.Object.extend(Ember.ActionHandler);
  var subject = ActionableObject.create();
  var called = assert.async();

  Ember.run(function() {
    subject.send('save');
    assert.ok(Ember.Logger.info.called);
    assert.ok(Ember.Logger.info.calledWith('Tracking Google Analytics event:', '["save"]'));
    called();
  });
});

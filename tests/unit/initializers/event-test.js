import Ember from 'ember';
import sinon from 'sinon';
import { initialize } from '../../../initializers/event';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | event', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

test('it notifies the Google Analytics server of an event', function(assert) {
  initialize(registry, application);
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

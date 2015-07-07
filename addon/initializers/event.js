import Ember from 'ember';

/*
 * Reopen the 'ActionHandler' object to extend
 * the send functionality. This is where we
 * will intercept the normal behaviour and push
 * the action to the Google Analytics engine.
 *
 * @method initialize
 *
 * @param {Ember.Container} container
 *   The application instance's container. The container stores all of the instance-specific state for this application.
 *
 * @param {Ember.Application} application
 *   The starting point for every Ember application.
 */
export function initialize(container, application) {
  var logTracking = application.get('LOG_TRACKING');

  return Ember.ActionHandler.reopen({

    /*
     * Push the event to the Google
     * Analytics engine.
     *
     * @method send
     */
    send: function() {
      this._super.apply(this, arguments);

      if(logTracking) {
        Ember.Logger.info('Tracking Google Analytics event:', JSON.stringify([].slice.call(arguments)));
      }

      // Create a generic array of arguments to
      // send Google Analytics. Most actions
      // will be a result of clicking a button.
      if(typeof window.ga !== 'undefined') {
        var code = [].concat.apply(['send', 'event', 'button', 'click'], arguments);
        window.ga.apply(this, code);
      }
    }
  });
}

export default {
  name: 'event',
  initialize: initialize
};

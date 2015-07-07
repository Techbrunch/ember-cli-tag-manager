import Ember from 'ember';

/*
 * Reopen the 'Router' object to extend the
 * didTrnasition functionality. This is where
 * we will intercept the normal behaviour and
 * push the page view to the Google Analytics
 * engine, Inspectlet and Optimizely.
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

  Ember.Router.reopen({

    /*
     * Push the page transition to the
     * Google Analytics engine.
     *
     * @method notifyGoogleAnalytics
     */
    notifyGoogleAnalytics: Ember.on('didTransition', function() {
      Ember.run.once(this, function() {
        if(logTracking) {
          Ember.Logger.info('Tracking Google Analytics pageview:', this.get('url'));
        }

        if(typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', { page: this.get('url'), title: this.get('url') });
        }
      });
    }),

    /*
     * Push the page transition to
     * Inspectlet.
     *
     * @method notifyInspectlet
     */
    notifyInspectlet: Ember.on('didTransition', function() {
      Ember.run.once(function() {
        if(typeof window.__insp !== 'undefined') {
          window.__insp.push(['virtualPage']);
        }
      });
    }),

    /*
     * Enable Optimizely experiments
     * for the route.
     *
     * @method notifyOptimizely
     */
    notifyOptimizely: Ember.on('didTransition', function() {
      Ember.run.once(function() {
        if(typeof window.optimizely !== 'undefined') {
          window.optimizely.push(['activate']);
        }
      });
    })
  });
}

export default {
  name: 'pageview',
  initialize: initialize
};

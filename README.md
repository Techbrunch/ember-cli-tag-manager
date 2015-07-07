# Ember-cli-tag-manager [![Build Status](https://travis-ci.org/tomasbasham/ember-cli-tag-manager.svg?branch=master)](https://travis-ci.org/tomasbasham/ember-cli-tag-manager)

An [Ember CLI](http://www.ember-cli.com/) addon to manage third-party JavaScript tags and tracking codes.

Often it is the case that you want your web site/application to have all the bells and whistles of any other modern web site/application. However to do this likely requires an array of third-party JavaScript tags and tracking codes that at some point become unmanageable.

This addon injects several common and useful third-party JavaScript tags and tracking codes into a HTML document, that include:

* [Google Universal Analytics](http://www.google.com/analytics/)
* [Google Remarketing](http://www.google.com/analytics/)
* [Google E-Commerce](http://www.google.com/analytics/)
* [Google Enhanced E-Commerce](http://www.google.com/analytics/)
* [Google Adwords Conversion Tracking](https://www.google.co.uk/adwords/)
* [Bing Analytics](https://www.bing.com/webmaster/)
* [Facebook](https://www.facebook.com/)
* [Inspectlet](https://www.inspectlet.com/)
* [Optimizely](https://www.optimizely.com/)

## Installation

From within your Ember CLI project directory run:
```
ember install:addon ember-cli-tag-manager
```

## Usage

This addon imposes several initialisers to extend the functionality of some core ember objects. These objects include the default `ActionHandler` to fire off events to the Google Analytics engine; and the `Router` to fire off page views to Google, Inspectlet and Optimizely.

It is not necessary to explicitly differ from normal ember implementation to use this addon. Each of the functions that have been implemented to extend the core objects will run automatically or as the result of sending an action.

##### <a name="invocation-example"></a>Example:

```JavaScript
// app/routes/index.js
import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    this.send('closeModals'); // This will fire an event off to Google.
    this.transitionTo('news'); // This will fire a pageview off to Google, Inspectlet and Optimizely.
  }
});
```

### Configuration

Of course you do not have to use all the JavaScript tags and tracking codes offered by this addon. Each is opt-in and requires you supply the appropriate tracking IDs or flags in the `environment.js` file to enable them. The variables are as follows:

* `GOOGLE_TRACKING_ID`
* `GOOGLE_REMARKETING`
* `GOOGLE_ECOMMERCE`
* `GOOGLE_ENHANCED_ECOMMERCE`
* `GOOGLE_ADWORDS_CONVERSION_TRACKING_ID`
* `BING_TRACKING_ID`
* `FACEBOOK_TRACKING_ID`
* `FACEBOOK_APP_ID`
* `INSPECTLET_TRACKING_ID`
* `OPTIMIZELY_TRACKING_ID`

The variables that end with `ID` require you to supply your tracking ID that can be found on the third-party provider's website, whilst all other variables require a boolean value to enable them (false by default or if not included in `environment.js`).

##### <a name="configuration-example"></a>Example:

```JavaScript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    ...
    APP: {
      GOOGLE_TRACKING_ID: 'UA-12345678-9',
      ENV.APP.GOOGLE_REMARKETING = true;
      ENV.APP.GOOGLE_ECOMMERCE = true;
    },
    ...
});
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

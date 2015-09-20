#Viewport.js

A compact JavaScript library to write device conditional JavaScript.

##Installation

###Bower

Run the following from your command line to install the `src/` folder to your `bower_components/` folder;

`bower install viewport-js`

##Documentation

###Condition Structure

The core library methods take in a condition, which is effectively an object with properties of device conditions to be met. They take the following structure;

  {
    height: {
      min: 100,
      max: 600
    },
    width: {
      min: 1024,
      max: 1920
    },
    pixelRatio: 2,
    orientation: 'landscape' // portrait|landscape
  }

Not supplying any property will mean that by default that property will be matched.

###Viewport().matches(condition (String|Object), callback (Callback Function));

Calling this method will assess the passed `condition`, and return `true` or `false` depending on whether the conditions are matched by the current device. If `callback` is passed, it will call the function and return nothing.

####Example

  Viewport().matches({
    height: {
      min: 100, 
      max: 1000
    },
    width: {
      min: 1024,
      max: 1920
    },
    pixelRatio: 2,
    orientation: 'portrait'
  }, function() {
    alert("Yay! We successfully matched.");
  });
  
###Viewport().register(alias (String), condition (Object));

Calling this method will save the condition to an alias which you can then pass to `Viewport().matches();` so that you can avoid writing objects each time you want a condition to be assessed.

####Example

  Viewport().register('bootstrap-xs-retina',
    {
      width: {max: 767}, 
      pixelRatio: 2
    }
  );
  
  if (Viewport().matches('bootstrap-xs-retina')) {
    // Do something
  }

## Browser Support

This library currently supported IE9+.

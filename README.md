# ilib-es6

ES6 wrappers around the ilib classes so that you can import just what you need and use
the classes with promises.

Usage
-----

All classes that ilib contains are echoed here in ilib-es6. You may use these as you
had before with the exact same API. There are some differences though.

(NOTE: this is a pre-release work in progress. That means wrappers for many classes
will be missing until version 1.0.0)

Including Classes
-----------------

With ilib-es6, you import classes instead of requiring them.

old:

```
var AddressFmt = require("ilib/lib/AddressFmt.js");
```

(This old syntax is still supported, though.)

new:

```
import AddressFmt from 'ilib-es6/lib/AddressFmt';
```


Asynchronous Calls Using Promises
--------------

When calling classes asynchronously, you can continue to use callbacks as before or
you can use the promises returned from the constructors.

old async call:

```javascript
var AddressFmt = require("ilib/lib/AddressFmt.js");

new AddressFmt({
  sync: false,
  onLoad: function(af) {
    // format some addresses using the af formatter
  }
});
```

new async calls:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmt";

new AddressFmt({
  sync: false
}).then(af => {
  // format some addresses using the af formatter
});
```

Note that you can leave out the onLoad callback if you like and just use the promise,
or you can use the callback and ignore the promise.

Asynchronous Methods
-------------

Promises are also supported for some class methods that are asynchronous as well.
Example:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmt";

new AddressFmt({
  sync: false
}).then(af => {
  // false for "asynchronous". getFormatInfo returns a promise as well.
  return af.getFormatInfo("en-US", false);
}).then(info => {
  // use the info here to create an address input form
});
```

Synchronous Classes
-----------

You can continue using ilib classes synchronously or asynchronously as you had
before.

old:

```javascript
var AddressFmt = require("ilib/lib/AddressFmt.js");

var af = new AddressFmt();
// now format some addresses using the af formatter
```

new:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmts";

const af = new AddressFmt();
// now format some addresses using the af formatter
```

The difference is that the options for asynchronous calls contain a property
"sync: false" whereas for synchronous calls, the "sync" property is missing
or it is set to a truthy value. When a class is used synchronously, the constructor
returns an instance of the class. When the same class is used asynchronously,
the constructor returns a promise.

Using Factories
---------------

Factory classes in ilib now have a regular version that switches between synchronous
and asynchronous depending on the value of the "sync" property in the options, and the
asynchronous-only version. The async version of the factory always has "Async" at the
end of the name.

```javascript
import CalendarFactory, {CalendarFactoryAsync} from 'ilib-es6/lib/CalendarFactory';

let promise = CalendarFactory({locale: 'ja-JP', sync: false});
promise.then(function(cal) {
  // do something with the new calendar.
});
```

The above is equivalent to this:

```javascript
import CalendarFactory, {CalendarFactoryAsync} from 'ilib-es6/lib/CalendarFactory';


let promise = CalendarFactoryAsync();
promise.then(function(cal) {
  // do something with the new calendar.
});
```

The Async version of each factory class is always asynchronous and always returns a
promise. The regular version will return a promise when called asynchronously.

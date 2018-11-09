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
you can use the promises returned from the _create_ factory method.

old async call using callbacks:

```javascript
var AddressFmt = require("ilib/lib/AddressFmt.js");

new AddressFmt({
  sync: false,
  onLoad: function(af) {
    // format some addresses using the af formatter
  }
});
```

new async calls using promises:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmt";

AddressFmt.create().then(af => {
  // format some addresses using the af formatter
});
```

Note that you can still use either method above. Both are still supported.

Promises with Parameters
-------------

The _create_ factory method takes the same parameters that the class's constructor takes. For example,
to create an address formatter in Switzerland with French, you would do:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmt";

AddressFmt.create({
  locale: "fr-CH"
}).then(af => {
  // format some Swiss addresses using the af formatter
});
```

Note that you do not need to pass the _sync_ or _onLoad_ parameters to the _create_ factory method. Calling
the create factory method implies asynchronous mode using promises instead of callbacks.

Asynchronous Methods
-------------

Promises are also supported for some class methods that are asynchronous as well.
Example:

```javascript
import AddressFmt from "ilib-es6/lib/AddressFmt";

AddressFmt.create().then(af => {
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
import AddressFmt from "ilib-es6/lib/AddressFmt";

const af = new AddressFmt();
// now format some addresses using the af formatter
```

The difference is that the options for asynchronous calls contain a property
"sync: false" whereas for synchronous calls, the "sync" property is missing
or it is set to a truthy value. When a class is used synchronously, the constructor
returns an instance of the class. When the same class is used asynchronously,
the constructor does not return anything, but calls the callback function given
in the onLoad property instead.

Using Factories
---------------

Factory functions in ilib now have two types: a regular version that returns an
instance of the class, and the asynchronous-only version that returns a promise.
The async version of the factory always has an "Async" suffix at the end of its name.

```javascript
import CalendarFactory, {CalendarFactoryAsync} from 'ilib-es6/lib/CalendarFactory';

let cal = CalendarFactory({locale: 'ja-JP'});
// do something with the new cal calendar.
```

The above is equivalent to this:

```javascript
import CalendarFactory, {CalendarFactoryAsync} from 'ilib-es6/lib/CalendarFactory';


let promise = CalendarFactoryAsync({locale: 'ja-JP'});
promise.then(function(cal) {
  // do something with the new cal calendar.
});
```

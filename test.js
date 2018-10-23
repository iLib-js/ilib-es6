process.env.BABEL_ENV = "test";
require("babel-register");

const { AddressFmt } = require('./src/AddressFmt.js');

new AddressFmt({
    sync: false,
    onLoad: function(fmt) {
        console.log("The formatter is " + JSON.stringify(fmt));
    }
});

var promise = new AddressFmt({sync: false, locale: "ko-KR"});
promise.then(function(fmt) {
    console.log("The second formatter is " + JSON.stringify(fmt));
});

var fmt = new AddressFmt({sync: true, locale: "de-DE"});
console.log("The third formatter is " + JSON.stringify(fmt));

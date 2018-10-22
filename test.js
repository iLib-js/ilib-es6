process.env.BABEL_ENV = "test";
require("babel-register");

const AddressFmt = require('./src/AddressFmt.js');

new AddressFmt({
    sync: false,
    onLoad: function(fmt) {
        console.log("The formatter is " + JSON.stringify(fmt));
    }
});
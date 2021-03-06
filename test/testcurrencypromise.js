/*
 * testcurrencyasync.js - test the currency routines
 *
 * Copyright © 2018, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Currency from "../lib/Currency.js";

module.exports.testcurrencypromise = {
    testCurrencyAsyncDefaults: function(test) {
        test.expect(7);
        Currency.create({
            sync: false
        }).then(function(cur) {
            test.ok(cur !== null);

            test.equal(cur.getCode(), "USD");
            test.equal(cur.getFractionDigits(), 2);
            test.equal(cur.getSign(), "$");
            test.equal(cur.getName(), "US Dollar");
            var locale = cur.getLocale();
            test.ok(typeof(locale) !== "undefined");
            test.equal(locale.toString(), "en-US");
            test.done();
        });
    },

    testCurrencyAsyncGetByCode1: function(test) {
        test.expect(6);
        Currency.create({
            code: "EUR",
            sync: false
        }).then(function(cur) {
            test.ok(cur !== null);

            test.equal(cur.getCode(), "EUR");
            test.equal(cur.getFractionDigits(), 2);
            test.equal(cur.getSign(), "€");
            test.equal(cur.getName(), "Euro");
            var locale = cur.getLocale();
            test.equal(locale.toString(), "en-US");
            test.done();
        });
    },

    testCurrencyAsyncGetByCodeUnknown: function(test) {
        Currency.create({
            code: "xxx",
            sync: false
        }).then(function(cur) {
            test.ok(!cur);
            test.done();
        });
    },

    testCurrencyAsyncGetBySignUnambiguous: function(test) {
        test.expect(6);
        Currency.create({
            sign: "€",
            sync: false
        }).then(function(cur) {
            test.ok(cur !== null);

            test.equal(cur.getCode(), "EUR");
            test.equal(cur.getFractionDigits(), 2);
            test.equal(cur.getSign(), "€");
            test.equal(cur.getName(), "Euro");
            var locale = cur.getLocale();
            test.equal(locale.toString(), "en-US");
            test.done();
        });
    },

    testCurrencyAsync: function(test) {
        test.expect(6);
        Currency.create({
            locale: "en-GB",
            sign: "$",
            sync: false
        }).then(function (cur) {
            test.ok(cur !== null);

            test.equal(cur.getCode(), "USD");
            test.equal(cur.getFractionDigits(), 2);
            test.equal(cur.getSign(), "$");
            test.equal(cur.getName(), "US Dollar");
            var locale = cur.getLocale();
            test.equal(locale.toString(), "en-GB");
            test.done();
        });
    }    
};

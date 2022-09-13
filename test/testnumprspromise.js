/*
 * testnumprsasync.js - test the number parsing routines
 *
 * Copyright © 2012-2018, 2022 JEDLSoft
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

import INumber from "../src/INumber.js";

export const testnumprspromise = {
    testNumberAsyncConstructorDefault: function(test) {
        test.expect(2);
        var num = INumber.create("3.4", {
            sync: false
        }).then(function(num) {
            test.ok(num !== null);
            test.equal(num.valueOf(), 3.4);
            test.done();
        });
    },

    testNumberAsyncConstructorWithIlibNumber: function(test) {
        test.expect(2);
        INumber.create("3.4", {
            sync: false
        }).then(function(num) {
            return INumber.create(num, {
                sync: false
            }).then(function(num2) {
                test.ok(num2 !== null);
                test.equal(num2.valueOf(), 3.4);
                test.done();
            });
        });
    },

    testNumberAsyncGetLocaleOther: function(test) {
        test.expect(3);
        var num = INumber.create("3,4", {
            locale: "de-DE",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);

            test.equal(num.getLocale().getSpec(), "de-DE");
            test.equal(num.valueOf(), 3.4);
            test.done();
        });
    },

    testNumberAsyncPercentage: function(test) {
        test.expect(2);
        var num = INumber.create("58.3%", {
            type: "percentage",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);

            test.equal(num.valueOf(), 0.583);
            test.done();
        });
    },

    testNumberAsyncCurrencyValue: function(test) {
        test.expect(2);
        var num = INumber.create("$5.80", {
            type: "currency",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);

            test.equal(num.valueOf(), 5.80);
            test.done();
        });
    },

    testNumberAsyncCurrencyForLocale: function(test) {
        test.expect(3);
        var num = INumber.create("£5.80", {
            type: "currency",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);

            var cur = num.getCurrency();
            test.ok(typeof(cur) !== "undefined");
            test.equal(cur.getCode(), "GBP");
            test.done();
        });
    },

    testNumberAsyncParseNonLatinDigits: function(test) {
        test.expect(2);

        // tests that the CType isDigit data is loaded
        INumber.create("১২৩.৪৫৬", {
            locale: "bn-IN",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);
            test.equal(num.valueOf(), 123.456);
            test.done();
        });
    },

    testNumberAsyncParseWithSpaces: function(test) {
        test.expect(2);

        // tests that CType isSpace data is loaded
        INumber.create("1 234 567,745", {
            locale: "fr-FR",
            sync: false
        }).then(function(num) {
            test.ok(num !== null);
            test.equal(num.valueOf(), 1234567.745);
            test.done();
        });
    }
};

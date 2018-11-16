/*
 * testnumfmtasync.js - test the number formatter object
 *
 * Copyright © 2018, JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSe-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import NumFmt from "../lib/NumFmt.js";

module.exports.testnumfmtpromise = {
    testNumFmtAsyncDefaults: function(test) {
        test.expect(7);
        NumFmt.create({
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getType(), "number");
            test.equal(fmt.getMaxFractionDigits(), -1);
            test.equal(fmt.getMinFractionDigits(), -1);
            test.ok(fmt.isGroupingUsed());
            test.equal(fmt.getRoundingMode(), "halfdown");
            test.ok(typeof(fmt.getCurrency()) === "undefined");
            test.done();
        });

    },

    testNumFmtAsyncNumberFormatSimple: function(test) {
        test.expect(2);
        NumFmt.create({
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.format(1.745), "1.745");
            test.done();
        });
    },

    testNumFmtAsyncNumberStyleStringArgument: function(test) {
        test.expect(2);
        NumFmt.create({
            style: "standard",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            // should work with string arguments
            test.equal(fmt.format("2345678901234567.0"), "2,345,678,901,234,567");
            test.done();
        });
    },

    testNumFmtAsyncFormatNativeDefaultTrue: function(test) {
        test.expect(2);
        NumFmt.create({
            locale: "bn-IN",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.format(123.456), "১২৩.৪৫৬");
            test.done();
        });
    },

    testNumFmtAsyncCurrencyFormatUS: function(test) {
        test.expect(2);
        NumFmt.create({
            type: "currency",
            currency: "USD",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.format(57.3467), "$57.35");
            test.done();
        });
    },

    testNumFmtAsyncCurrencyGetFractionDigitsOtherCurrency: function(test) {
        test.expect(3);
        NumFmt.create({
            type: "currency",
            currency: "JPY",  // Japanese yen
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getMaxFractionDigits(), 0);
            test.equal(fmt.getMinFractionDigits(), 0);
            test.done();
        });
    },

    testNumFmtAsyncPercentageFormatRegular_kn_IN: function(test) {
        test.expect(2);
        NumFmt.create({
            locale: "kn-IN",
            useNative: true,
            type: "percentage",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.format(57.8), "೫೭.೮%");
            test.done();
        });
    }
};

/*
 * currencyasync.test.js - test the currency routines
 *
 * Copyright © 2018, 2024 2022, 2024 JEDLSoft
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

import Currency from "../src/Currency.js";

describe("testcurrencyasync", () => {
    test("CurrencyAsyncDefaults", () => {
        expect.assertions(7);
        new Currency({
            sync: false,
            onLoad: function(cur) {
                expect(cur !== null).toBeTruthy();

                expect(cur.getCode()).toBe("USD");
                expect(cur.getFractionDigits()).toBe(2);
                expect(cur.getSign()).toBe("$");
                expect(cur.getName()).toBe("US Dollar");
                var locale = cur.getLocale();
                expect(typeof(locale) !== "undefined").toBeTruthy();
                expect(locale.toString()).toBe("en-US");
            }
        });
    });

    test("CurrencyAsyncGetByCode1", () => {
        expect.assertions(6);
        new Currency({
            code: "EUR",
            sync: false,
            onLoad: function(cur) {
                expect(cur !== null).toBeTruthy();

                expect(cur.getCode()).toBe("EUR");
                expect(cur.getFractionDigits()).toBe(2);
                expect(cur.getSign()).toBe("€");
                expect(cur.getName()).toBe("Euro");
                var locale = cur.getLocale();
                expect(locale.toString()).toBe("en-US");
            }
        });
    });

    test("CurrencyAsyncGetByCodeUnknown", () => {
        new Currency({
            code: "xxx",
            sync: false,
            onLoad: function(cur) {
                expect(!cur).toBeTruthy();
            }
        });
    });

    test("CurrencyAsyncGetBySignUnambiguous", () => {
        expect.assertions(6);
        new Currency({
            sign: "€",
            sync: false,
            onLoad: function(cur) {
                expect(cur !== null).toBeTruthy();

                expect(cur.getCode()).toBe("EUR");
                expect(cur.getFractionDigits()).toBe(2);
                expect(cur.getSign()).toBe("€");
                expect(cur.getName()).toBe("Euro");
                var locale = cur.getLocale();
                expect(locale.toString()).toBe("en-US");
            }
        });
    });

    test("CurrencyAsync", () => {
        expect.assertions(6);
        new Currency({
            locale: "en-GB",
            sign: "$",
            sync: false,
            onLoad: function (cur) {
                expect(cur !== null).toBeTruthy();

                expect(cur.getCode()).toBe("USD");
                expect(cur.getFractionDigits()).toBe(2);
                expect(cur.getSign()).toBe("$");
                expect(cur.getName()).toBe("US Dollar");
                var locale = cur.getLocale();
                expect(locale.toString()).toBe("en-GB");
            }
        });
    });
});

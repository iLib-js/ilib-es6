/*
 * localematchasync.test.js - test the locale matcher object
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

import LocaleMatcher from "../src/LocaleMatcher.js";

describe("testlocalematchasync", () => {
    test("LocaleMatcherAsyncConstructor", () => {
        expect.assertions(1);
        new LocaleMatcher({
            sync: false,
            onLoad: function(lm) {
                expect(lm !== null).toBeTruthy();
            }
        });
    });

    test("LocaleMatcherAsyncGetLikelyLocaleByLanguage1", () => {
        expect.assertions(3);
        new LocaleMatcher({
            locale: "uz",
            sync: false,
            onLoad: function(lm) {
                expect(typeof(lm) !== "undefined").toBeTruthy();
                var locale = lm.getLikelyLocale();
                expect(typeof(locale) !== "undefined").toBeTruthy();
                expect(locale.getSpec()).toBe("uz-Latn-UZ");
            }
        });
    });

    test("LocaleMatcherAsyncGetLikelyLocaleByRegion", () => {
        expect.assertions(3);
        new LocaleMatcher({
            locale: "UZ",
            sync: false,
            onLoad: function(lm) {
                expect(typeof(lm) !== "undefined").toBeTruthy();
                var locale = lm.getLikelyLocale();
                expect(typeof(locale) !== "undefined").toBeTruthy();
                expect(locale.getSpec()).toBe("uz-Latn-UZ");
            }
        });
    });

    test("LocaleMatcherAsyncGetLikelyLocaleByScript", () => {
        expect.assertions(3);
        new LocaleMatcher({
            locale: "Arab",
            sync: false,
            onLoad: function(lm) {
                expect(typeof(lm) !== "undefined").toBeTruthy();
                var locale = lm.getLikelyLocale();
                expect(typeof(locale) !== "undefined").toBeTruthy();
                expect(locale.getSpec()).toBe("ar-Arab-EG");
            }
        });
    });
});

/*
 * stringsasync.test.js - test the String object
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

import NormString from "../src/NormString.js";
import Locale from "../src/Locale.js";
import IString from "../src/IString.js";

describe("teststringspromise", () => {
    test("StringLoadPlurals", () => {
        expect.assertions(1);
        return IString.loadPlurals(false, undefined).then(function() {
            var str = new IString("asdf");

            expect(str !== null).toBeTruthy();
        });
    });

    test("StringSetLocale", () => {
        expect.assertions(2);
        var str = new IString("1#first string|2#second string");
        return str.setLocale("de-DE", false).then(function() {
            expect(str !== null).toBeTruthy();

            expect(str.toString()).toBe("1#first string|2#second string");
        });
    });

    test("StringFormatChoiceSimpleNoPlurals", () => {
        expect.assertions(2);
        var str = new IString("1#first string|2#second string");

        expect(str !== null).toBeTruthy();

        // should default to English rules
        expect(str.formatChoice(1)).toBe("first string");
    });

    test("StringFormatChoiceSimpleRussian", () => {
        expect.assertions(3);
        var str = new IString("1#first string|few#second string|many#third string");
        return str.setLocale("ru-RU", false).then(function() {
            expect(str !== null).toBeTruthy();

            expect(str.formatChoice(2)).toBe("second string");
            expect(str.formatChoice(5)).toBe("third string");
        });
    });

    test("StringFormatChoiceSimpleRussianTwice", () => {
        expect.assertions(4);
        var str = new IString("1#first string|few#second string|many#third string");
        return str.setLocale("ru-RU", false).then(function() {
            expect(str !== null).toBeTruthy();

            expect(str.formatChoice(5)).toBe("third string");
            str = new IString("1#single|few#few|many#many");

            // Russian rules should already be loaded. Need to make sure
            // the callback is still called anyways
            str.setLocale("ru-RU", false).then(function() {
                expect(str !== null).toBeTruthy();
                expect(str.formatChoice(5)).toBe("many");
            });
        });
    });

});

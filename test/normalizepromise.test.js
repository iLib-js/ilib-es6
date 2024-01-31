/*
 * normalizeasync.test.js - test phonenumber normalize function()
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

import PhoneNumber from "../src/PhoneNumber.js";

describe("testnormalizepromise", () => {
    test("NormalizeAsyncIDDPrefix", () => {
        expect.assertions(1);
        return PhoneNumber.create("011 31 456 3453434", {
            locale: 'en-US',
            sync: false
        }).then(parsed => {
            parsed.normalize({
                locale: 'en-US',
                sync: false
            }).then(normalized => {
                var expected = "+314563453434";
                expect(normalized).toBe(expected);
            });
        });
    });

    test("NormalizeAsyncLDNumberUsingDEMCC", () => {
        expect.assertions(1);
        return PhoneNumber.create("02302 654321", {
            locale: 'de-DE',
            sync: false
        }).then(parsed => {
            parsed.normalize({
                mcc: "262",
                locale: 'en-US',
                sync: false
            }).then(normalized => {
                var expected = "+492302654321";

                expect(normalized).toBe(expected); // 'de-DE'
            });
        });
    });

    test("NormalizeAsyncLDNumberUsingUSSpanishLocale", () => {
        expect.assertions(1);
        return PhoneNumber.create("650 7654321", {
            locale: 'es-US',
            sync: false
        }).then(parsed => {
            parsed.normalize({
                locale: 'en-US',
                sync: false
            }).then(normalized => {
                var expected = "+16507654321";

                expect(normalized).toBe(expected); // 'es-US'
            });
        });
    });
});

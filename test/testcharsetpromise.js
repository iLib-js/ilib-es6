/*
 * testcharsetasync.js - test the charset info object
 *
 * Copyright © 2018, 2022 JEDLSoft
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

import Charset from "../src/Charset.js";

export const testcharsetpromise = {
    testCharsetAsyncConstructor: function(test) {
        test.expect(1);
        Charset.create({
            sync: false
        }).then(function(cs) {
            test.ok(cs !== null);
            test.done();
        });
    },

    testCharsetAsyncGetStandardNameIdentity: function(test) {
        test.expect(2);
        Charset.create({
            name: "UTF-8",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getName(), "UTF-8");
            return Charset.create({
                name: "KOI8-R",
                sync: false
            });
        }).then(function(cs) {
            test.equal(cs.getName(), "KOI8-R");
            test.done();
        });
    },

    testCharsetAsyncGetStandardNameUndefined: function(test) {
        test.expect(1);
        Charset.create({
            sync: false
        }).then(function(cs) {
            test.ok(typeof(cs) !== "undefined");
            test.done();
        });
    },

    testCharsetAsyncGetStandardNameIdentityUnknown: function(test) {
        test.expect(1);
        Charset.create({
            name: "foobarfoo",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getName(), "foobarfoo");
            test.done();
        });
    },

    testCharsetAsyncGetStandardNameUTF8: function(test) {
        test.expect(1);
        Charset.create({
            name: "UTF8",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getName(), "UTF-8");
            test.done();
        });
    },

    testCharsetAsyncGetStandardNameISOLatin1: function(test) {
        test.expect(3);
        Charset.create({
            name: "Latin1",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getName(), "ISO-8859-1");
            return Charset.create({
                name: "ISO-8859-1",
                sync: false
            });
        }).then(function(cs) {
            test.equal(cs.getName(), "ISO-8859-1");
            return Charset.create({
                name: "ISO-Latin-1",
                sync: false
            });
        }).then(function(cs) {
            test.equal(cs.getName(), "ISO-8859-1");
            test.done();
        });
    },

    testCharsetAsyncGetOriginalNameUnknown: function(test) {
        test.expect(1);
        Charset.create({
            name: "foobarfoo",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getOriginalName(), "foobarfoo");
            test.done();
        });
    },

    testCharsetAsyncMinCharWidth1: function(test) {
        test.expect(1);
        Charset.create({
            name: "Latin1",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getMinCharWidth(), 1);
            test.done();
        });
    },

    testCharsetAsyncMinCharWidth2: function(test) {
        test.expect(1);
        // built-in
        Charset.create({
            name: "UCS-2",
            sync: false
        }).then(function(cs) {
            test.equal(cs.getMinCharWidth(), 2);
            test.done();
        });
    },

    testCharsetAsyncIsMultibyteTrue: function(test) {
        test.expect(1);
        Charset.create({
            name: "Shift_JIS",
            sync: false
        }).then(function(cs) {
            test.ok(cs.isMultibyte());
            test.done();
        });
    },


    testCharsetAsyncIsBigEndianUTF16: function(test) {
        test.expect(1);
        Charset.create({
            name: "UTF-16",
            sync: false
        }).then(function(cs) {
            test.ok(cs.isBigEndian());
            test.done();
        });
    }
};

/*
 * testnormasync.js - test the Unicode Normalization Algorithm routines
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

import NormString from "../src/NormString.js";

function toHexString(string) {
    var i, result = ""; 

    if (!string) {
        return "";
    }
    for (i = 0; i < string.length; i++) {
        var ch = string.charCodeAt(i).toString(16);
        result += "0000".substring(0, 4-ch.length) + ch;
        if (i < string.length - 1) {
            result += " ";
        }
    }
    return result.toUpperCase();
}


module.exports.testnormpromise = {
    testNormStringAsyncNormalizeNFD: function(test) {
        test.expect(1);

        NormString.create("ᄀ각ᆨ", {
            sync: false
        }).then(function(str) {
            test.equal(str.normalize("nfd"), "ᄀ각ᆨ");
            test.done();
        });
    },

    testNormStringAsyncNormalizeNFKD: function(test) {
        test.expect(1);
        NormString.create("ᄀ각ᆨ", {
            sync: false
        }).then(function(str) {
            test.equal(str.normalize("nfkd"), "ᄀ각ᆨ");
            test.done();
        });
    },

    testNormStringAsyncNormalizeNFC: function(test) {
        test.expect(1);
        NormString.create("ᄀ각ᆨ", {
            sync: false
        }).then(function(str) {
            test.equal(str.normalize("nfc"), "ᄀ각ᆨ");
            test.done();
        });
    },

    testNormStringAsyncNormalizeNFKC: function(test) {
        test.expect(1);
        NormString.create("ᄀ각ᆨ", {
            sync: false
        }).then(function(str) {
            test.equal(str.normalize("nfkc"), "ᄀ각ᆨ");
            test.done();
        });
    },

    testNormStringAsyncCharIteratorDecomposed: function(test) {
        test.expect(8);
        var s = NormString.create("aÄa", { // the A umlaut is a decomposed char
            sync: false
        }).then(function(str) {
            var it = str.charIterator();

            test.ok(it.hasNext());
            test.equal(it.next(), "a");
            test.ok(it.hasNext());
            test.equal(it.next(), "Ä");
            test.ok(it.hasNext());
            test.equal(it.next(), "a");
            test.ok(!it.hasNext());
            test.equal(it.next(), undefined);
            test.done();
        });
    }    
};

/*
 * testscriptinfoasync.js - test the script info object
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

import ScriptInfo from "../lib/ScriptInfo.js";

module.exports.testscriptinfopromise = {
    testScriptInfoAsyncConstructor: function(test) {
        test.expect(1);
        var si = ScriptInfo.create(undefined, {
            sync: false
        }).then(function(si) {
            test.ok(si !== null);
            test.done();
        });
    },

    testScriptInfoAsyncGet1: function(test) {
        test.expect(8);
        var si = ScriptInfo.create("Latn", {
            sync: false
        }).then(function(si) {
            test.ok(si !== null);

            test.equal(si.getCode(), "Latn");
            test.equal(si.getCodeNumber(), 215);
            test.equal(si.getName(), "Latin");
            test.equal(si.getLongCode(), "Latin");
            test.equal(si.getScriptDirection(), "ltr");
            test.ok(!si.getNeedsIME());
            test.ok(si.getCasing());
            test.done();
        });
    },

    testScriptInfoAsyncGet4: function(test) {
        test.expect(8);
        var si = ScriptInfo.create("Hans", {
            sync: false
        }).then(function(si) {
            test.ok(si !== null);

            test.equal(si.getCode(), "Hans");
            test.equal(si.getCodeNumber(), 501);
            test.equal(si.getName(), "Han (Simplified variant)");
            test.equal(si.getLongCode(), "Han_(Simplified_variant)");
            test.equal(si.getScriptDirection(), "ltr");
            test.ok(si.getNeedsIME());
            test.ok(!si.getCasing());
            test.done();
        });
    },

    testScriptInfoAsyncGetDefaultLongCodeArab: function(test) {
        test.expect(8);
        var si = ScriptInfo.create("Arab", {
            sync: false
        }).then(function(si) {
            test.ok(si !== null);

            test.equal(si.getCode(), "Arab");
            test.equal(si.getCodeNumber(), 160);
            test.equal(si.getName(), "Arabic");
            test.equal(si.getLongCode(), "Arabic");
            test.equal(si.getScriptDirection(), "rtl");
            test.ok(!si.getNeedsIME());
            test.ok(!si.getCasing());
            test.done();
        });
    },
    testScriptInfoAsyncGetUnknown: function(test) {
        test.expect(5);
        var si = ScriptInfo.create("Fooo", {
            sync: false
        }).then(function(si) {
            test.ok(si !== null);

            test.equal(si.getCode(), undefined);
            test.equal(si.getCodeNumber(), 0);
            test.equal(si.getName(), undefined);
            test.equal(si.getLongCode(), undefined);
            test.done();
        });
    },

    testScriptInfoAsyncGetAllScripts: function(test) {
        test.expect(11);
        ScriptInfo.getAllScripts(false, undefined, function(scripts) {
            test.ok(scripts !== null);

            test.equal(scripts.length, 203);

            test.equal(scripts[0], "Adlm");
            test.equal(scripts[1], "Afak");
            test.equal(scripts[2], "Aghb");
            test.equal(scripts[4], "Arab");
            test.equal(scripts[scripts.length-1], "Zzzz");

            // make sure the callback is called after the 2nd call
            ScriptInfo.getAllScripts(false, undefined, function(scripts) {
                test.ok(scripts !== null);

                test.equal(scripts.length, 203);

                test.equal(scripts[0], "Adlm");
                test.equal(scripts[scripts.length-1], "Zzzz");

                test.done();
            });
        });
    }
};

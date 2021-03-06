/*
 * testlistfmtasync.js - test the list formatter object
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

import ListFmt from "../lib/ListFmt.js";

module.exports.testlistfmtpromise = {
    testListFmtAsyncConstructorEmpty: function(test) {
        ListFmt.create({
            sync: false
        }).then(function(fmt) {
            test.expect(1);
            test.ok(fmt !== null);
            test.done();
        });
    },

    testListFmtAsyncTestPropertyTwo: function(test) {
        ListFmt.create({
            sync: false
        }).then(function(fmt) {
            test.expect(2);
            test.ok(fmt !== null);
            test.equal(fmt.format(["true", "false"]), "true & false");
            test.done();
        });
    },

    testListFmtAsyncbnINNumberFormatFour: function(test) {
        ListFmt.create({
            locale: "bn-IN",
            sync: false
        }).then(function(fmt) {
            test.expect(2);
            test.ok(fmt !== null);
            test.equal(fmt.format(["এক", "দুই", "তিন", "চার"]), "এক, দুই, তিন এবং চার");
            test.done();
        });
    },

    testListFmtAsynckoKRNumberFormatThree: function(test) {
        ListFmt.create({
            locale: "ko-KR",
            sync: false
        }).then(function(fmt) {
            test.expect(2);
            test.ok(fmt !== null);
            test.equal(fmt.format(["하나", "둘", "셋"]), "하나, 둘 및 셋");
            test.done();
        });
    }
};

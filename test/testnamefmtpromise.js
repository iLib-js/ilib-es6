/*
 * testnamefmtasync.js - test the name formatter object
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

import NameFmt from "../lib/NameFmt.js";
import Name from "../lib/Name.js";

module.exports.testnamefmtpromise = {
    testNameFmtAsyncConstructor: function(test) {
        test.expect(1);
        new NameFmt({
            sync: false
        }).then(function(fmt) {
            test.ok(typeof(fmt) !== "undefined");
            test.done();
        });
    },

    testNameFmtAsyncGetBogus: function(test) {
        test.expect(1);
        new NameFmt({
            locale: "ii-II",
            sync: false
        }).then(function(fmt) {
            test.equal(fmt.getLocale().getSpec(), "ii-II");
            test.done();
        });

    },

    testNameFmtAsyncENFull: function(test) {
        test.expect(1);
        new Name({
            prefix: "Mr.",
            givenName: "John",
            middleName: "Kevin",
            familyName: "Smith",
            suffix: "Phd."
        }, {
            sync: false
        }).then(function(name) {
            return new NameFmt({
                style: "full",
                sync: false
            }).then(function(fmt) {
                test.equal(fmt.format(name), "Mr. John Kevin Smith Phd.");
                test.done();
            });
        });
    },

    testNameFmtAsyncDEFull: function(test) {
        test.expect(1);
        new Name({
            prefix: "Hr.",
            givenName: "Andreas",
            middleName: "Helmut",
            familyName: "Schmidt",
            suffix: "MdB"
        }, {
            locale: "de-DE",
            sync: false
        }).then(function(name) {
            new NameFmt({
                style: "full",
                locale: "de-DE",
                sync: false
            }).then(function(fmt) {
                test.equal(fmt.format(name), "Hr. Andreas Helmut Schmidt MdB");
                test.done();
            });
        });
    },

    testNameFmtAsyncZHFormalLong: function(test) {
        test.expect(1);
        new Name({
            honorific: "医生",
            givenName: "芳",
            familyName: "李"
        }, {
            locale: "zh-Hans-CN",
            sync: false
        }).then(function(name) {
            new NameFmt({
                style: "formal_long",
                locale: "zh-Hans-CN",
                sync: false
            }).then(function(fmt) {
                test.equal(fmt.format(name), "李芳医生");
                test.done();
            });
        });
    },

    testNameFmtAsyncZHFormalLong: function(test) {
        test.expect(1);
        new Name({
            honorific: "닥터",
            givenName: "은성",
            familyName: "박"
        }, {
            locale: "ko-KR",
            sync: false
        }).then(function(name) {
            new NameFmt({
                style: "formal_long",
                locale: "ko-KR",
                sync: false
            }).then(function(fmt) {
                test.equal(fmt.format(name), "닥터 박은성");
                test.done();
            });
        });
    }
};

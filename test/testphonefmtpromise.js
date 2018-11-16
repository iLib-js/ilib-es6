/*
 * testphonefmtasync.js - Test the phonefmt
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

import PhoneNumber from "../lib/PhoneNumber.js";
import PhoneFmt from "../lib/PhoneFmt.js";

module.exports.phonefmtpromise = {
    testFormatAsyncUSNoLocale: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            areaCode: "456",
            subscriberNumber: "3453434"
        }, {
            sync: false
        }).then(function(parsed) {
            // default to US format
            return PhoneFmt.create({
                style: "default",
                sync: false
            }).then(function(fmt) {
                var expected = "(456) 345-3434";
                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncUSPlusIDDtoUnknownCountry: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            iddPrefix: "+",
            countryCode: "506",    // costa rica
            subscriberNumber: "87654321"
        }, {
            sync: false
        }).then(function(parsed) {
            // default to US format
            return PhoneFmt.create({
                locale: "en-US",
                style: "dashes",
                sync: false
            }).then(function(fmt) {
                var expected = "+506 87654321";    // use last resort rule for subscriber number

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncUSStyle0Emergency: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            emergency: "911"
        }, {
            sync: false
        }).then(function(parsed) {
            // default to US format
            return PhoneFmt.create({
                locale: "en-US",
                style: "default",
                sync: false
            }).then(function(fmt) {
                var expected = "911 ";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncUSNumberWithFRMCC: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            trunkAccess: "0",
            areaCode: "6",
            subscriberNumber: "15987654"
        }, {
            sync: false
        }).then(function(parsed) {
            // default to US format
            return PhoneFmt.create({
                locale: "en-US",
                style: "default",
                mcc: "208",
                sync: false
            }).then(function(fmt) {
                var expected = "06 15 98 76 54";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncWithParamsFormatUSInternational: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            iddPrefix: "+",
            countryCode: "33",
            areaCode: "1",
            subscriberNumber: "12345678"
        }, {
            locale: "en-US",
            sync: false
        }).then(function(parsed) {
            return PhoneFmt.create({
                locale: "en-US",
                sync: false
            }).then(function(fmt) {
                var expected = "+33 1 12 34 56 78";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncGBLongAreaCode: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            trunkAccess: "0",
            areaCode: "17684",
            subscriberNumber: "12345"
        }, {
            locale: "en-GB",
            sync: false
        }).then(function(parsed) {
            return PhoneFmt.create({
                locale: "en-GB",
                style: "default",
                sync: false
            }).then(function(fmt) {
                var expected = "(0176 84) 12345";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });


    },

    testFormatAsyncDEStyle1: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create({
            trunkAccess: "0",
            areaCode: "6224",
            subscriberNumber: "1234567"
        }, {
            locale: "de-DE",
            sync: false
        }).then(function(parsed) {
            return PhoneFmt.create({
                locale: "de-DE",
                style: "alten",
                sync: false
            }).then(function(fmt) {
                var expected = "06224/1 23 45 67";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    },

    testFormatAsyncJPStyle1: function(test) {
        test.expect(1);
        var formatted;
        PhoneNumber.create("0668795111", {
            locale: "ja-JP",
            sync: false
        }).then(function(parsed) {
            return PhoneFmt.create({
                locale: "ja-JP",
                style: "default",
                sync: false
            }).then(function(fmt) {
                var expected = "06-6879-5111";

                fmt.format(parsed, {
                    sync: false
                }).then(function(formatted) {
                    test.equal(formatted, expected);
                    test.done();
                });
            });
        });
    }
};

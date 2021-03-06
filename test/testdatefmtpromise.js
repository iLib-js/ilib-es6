/*
 * testdatefmtpromise.js - test the date formatter object asynchronously
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

import ilib from "../lib/ilib.js";
import ThaiSolarDate from "../lib/ThaiSolarDate.js";
import PersianDate from "../lib/PersianDate.js";
import IslamicDate from "../lib/IslamicDate.js";
import HebrewDate from "../lib/HebrewDate.js";
import GregorianDate from "../lib/GregorianDate.js";
import JulianDate from "../lib/JulianDate.js";
import DateFmt from "../lib/DateFmt.js";
import DateFactory from "../lib/DateFactory.js";

module.exports.testdatefmtpromise = {
    testDateFmtConstructorEmpty: function(test) {
        test.expect(1);
        DateFmt.create({
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);
            test.done();
        });
    },

    testDateFmtGetCalendarExplicit: function(test) {
        test.expect(3);
        DateFmt.create({
            calendar: "julian",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt);
            var cal = fmt.getCalendar();
            test.ok(cal);

            test.equal(cal, "julian");
            test.done();
        });
    },

    testDateFmtGetCalendarNotInThisLocale: function(test) {
        DateFmt.create({
            calendar: "arabic",
            locale: 'en-US',
            sync: false
        }).then(function(fmt) {
            // "No formats available for calendar arabic in locale en-US"
            test.ok(!fmt);
            test.done();
        });
    },

    testDateFmtGetTimeZoneDefault: function(test) {
        test.expect(2);
        ilib.tz = undefined;    // just in case
        if (ilib._getPlatform() === "nodejs") {
            process.env.TZ = "";
        }

        DateFmt.create({
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getTimeZone().getId(), "local");
            test.done();
        });
    },

    testDateFmtGetTimeZone: function(test) {
        test.expect(2);
        DateFmt.create({
            timezone: "Europe/Paris",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getTimeZone().getId(), "Europe/Paris");
            test.done();
        });
    },

    testDateFmtUseTemplateNonEmptyCalendar: function(test) {
        test.expect(2);
        DateFmt.create({
            calendar: 'julian',
            template: "EEE 'the' DD 'of' MM, yyyy G",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getCalendar(), "julian");
            test.done();
        });
    },

    testDateFmtUseTemplateNonEmptyLocale: function(test) {
        test.expect(2);
        var fmt = DateFmt.create({
            locale: 'de-DE',
            template: "EEE 'the' DD 'of' MM, yyyy G",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            test.equal(fmt.getLocale().toString(), "de-DE");
            test.done();
        });
    },

    testDateFmtFormatJSDate1: function(test) {
        test.expect(2);
        DateFmt.create({
            type: "time",
            length: "short",
            timezone: "America/Los_Angeles",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            // test formatting a javascript date. It should be converted to
            // an ilib date object automatically and then formatted
            var datMyBday = new Date("Fri Aug 13 1982 13:37:35 GMT-0700");
            test.equal(fmt.format(datMyBday), "1:37 PM");
            test.done();
        });
    },

    testDateFmtFormatJSDateRightTimeZone1: function(test) {
        test.expect(2);
        var fmt = DateFmt.create({
            type: "date",
            length: "full",
            date: "w",
            timezone: "America/Los_Angeles",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            // test formatting a javascript date. It should be converted to
            // an ilib date object automatically and then formatted
            var datMyBday = new Date("Wed May 14 2014 23:37:35 GMT-0700");
            test.equal(fmt.format(datMyBday), "Wednesday");
            test.done();
        });
    },

    testDateFmtGetMonthsOfYearThai: function(test) {
        test.expect(2);
        // uses ThaiSolar calendar
        var fmt = DateFmt.create({
            locale: "th-TH",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            var arrMonths = fmt.getMonthsOfYear({length: "long"});

            var expected = [undefined, "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
            test.deepEqual(arrMonths, expected);
            test.done();
        });
    },

    testDateFmtFormatRelativeWithinMinuteAfter: function(test) {
        test.expect(1);
        DateFmt.create({
            length: "full",
            sync: false
        }).then(function(fmt) {
            GregorianDate.create({
                year: 2011,
                month: 11,
                day: 20,
                hour: 13,
                minute: 45,
                second: 0,
                millisecond: 0,
                sync: false
            }).then(function(reference) {
                GregorianDate.create({
                    year: 2011,
                    month: 11,
                    day: 20,
                    hour: 13,
                    minute: 45,
                    second: 30,
                    millisecond: 0,
                    sync: false
                }).then(function(date) {
                    test.equal(fmt.formatRelative(reference, date), "in 30 seconds");
                    test.done();
                });
            });
        });
    },

    testDateFmtConvertToGMT: function(test) {
        test.expect(2);
        var fmt = DateFmt.create({
            length: "short",
            type: "datetime",
            timezone: "Europe/London",
            locale: "en-GB",
            time: "hmaz",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            GregorianDate.create({
                year: 2011,
                month: 9,
                day: 20,
                hour: 13,
                minute: 45,
                second: 0,
                millisecond: 0,
                timezone: "America/Los_Angeles",
                locale: "en-US",
                sync: false
            }).then(function(date) {
                test.equal(fmt.format(date), "20/09/2011, 21:45 GMT/BST");
                test.done();
            });
        });
    },

    testDateFmtConvertToOtherTimeZone: function(test) {
        test.expect(2);
        DateFmt.create({
            length: "short",
            type: "datetime",
            timezone: "Australia/Sydney",
            locale: "en-AU",
            time: "hmaz",
            sync: false
        }).then(function(fmt) {
            test.ok(fmt !== null);

            GregorianDate.create({
                year: 2011,
                month: 9,
                day: 20,
                hour: 13,
                minute: 45,
                second: 0,
                millisecond: 0,
                timezone: "America/Los_Angeles",
                locale: "en-US",
                sync: false
            }).then(function(date) {
                test.equal(fmt.format(date), "21/9/11, 6:45 am AEST");
                test.done();
            });
        });
    }
};
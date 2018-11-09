/*
 * testcalpromise.js - test the calendar objects asynchronously with promises
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

import CalendarFactory, {CalendarFactoryAsync} from "../src/CalendarFactory.js";
import CopticDate from "../src/CopticDate.js";
import EthiopicDate from "../src/EthiopicDate.js";
import GregorianDate from "../src/GregorianDate.js";
import HanDate from "../src/HanDate.js";
import HebrewDate from "../src/HebrewDate.js";
import IslamicDate from "../src/IslamicDate.js";
import JulianDate from "../src/JulianDate.js";
import PersianAlgoDate from "../src/PersianAlgoDate.js";
import PersianDate from "../src/PersianDate.js";
import ThaiSolarDate from "../src/ThaiSolarDate.js";

module.exports.testcalpromise = {
    testCalendarPromiseFactoryAsyncDefault: function(test) {
        test.expect(1);
        CalendarFactory({
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");
            test.done();
        });
    },

    testCalendarPromiseFactoryAsyncSpecific: function(test) {
        test.expect(2);
        var cal = CalendarFactory({
            type: "julian",
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");

            test.equal(cal.getType(), "julian");
            test.done();
        });
    },

    testCalendarPromiseFactoryAsyncUnknown: function(test) {
        test.expect(1);
        CalendarFactory({
            type: "asdf",
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) === "undefined");
            test.done();
        }).catch(function(e) {
            test.fail();
            console.log("caught: " + e);
            test.done();
        });
    },

    testCalendarPromiseFactoryAsyncDefaultForLocale: function(test) {
        test.expect(2);
        CalendarFactory({
            locale: "fa-IR",
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");

            test.equal(cal.getType(), "persian");
            test.done();
        });
    },

    testCalendarPromiseFactoryAsyncDefaultForLocaleOther: function(test) {
        test.expect(2);
        var cal = CalendarFactory({
            locale: "th-TH",
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");

            test.equal(cal.getType(), "thaisolar");
            test.done();
        });
    },

    testCalendarPromiseFactoryAsyncOverrideLocale: function(test) {
        test.expect(2);
        var cal = CalendarFactory({
            locale: "fa-IR",
            type: "gregorian",
            sync: false
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");

            test.equal(cal.getType(), "gregorian");
            test.done();
        });
    },

    testCopticDatePromiseConstructorFull: function(test) {
        test.expect(8);
        try {
        CopticDate.create({
            year: 1735,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(cd) {
            test.ok(cd !== null);

            test.equal(cd.getYears(), 1735);
            test.equal(cd.getMonths(), 9);
            test.equal(cd.getDays(), 23);
            test.equal(cd.getHours(), 16);
            test.equal(cd.getMinutes(), 7);
            test.equal(cd.getSeconds(), 12);
            test.equal(cd.getMilliseconds(), 123);
            test.done();
        }).catch(function(err) {
            console.log("Error: " + err);
            test.fail();
            test.done();
        });
        } catch (e) {
            console.log("Got exception: " + e);
            test.fail();
            test.done();
        }
    },

    testEthiopicDatePromiseConstructorFull: function(test) {
        test.expect(8);
        EthiopicDate.create({
            year: 2011,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(ed) {
            test.ok(ed !== null);

            test.equal(ed.getYears(), 2011);
            test.equal(ed.getMonths(), 9);
            test.equal(ed.getDays(), 23);
            test.equal(ed.getHours(), 16);
            test.equal(ed.getMinutes(), 7);
            test.equal(ed.getSeconds(), 12);
            test.equal(ed.getMilliseconds(), 123);
            test.done();
        });
    },

    testGregDatePromiseConstructorFull: function(test) {
        test.expect(8);
        GregorianDate.create({
            year: 2011,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            sync: false
        }).then(function(gd) {
            test.ok(gd !== null);

            test.equal(gd.getYears(), 2011);
            test.equal(gd.getMonths(), 9);
            test.equal(gd.getDays(), 23);
            test.equal(gd.getHours(), 16);
            test.equal(gd.getMinutes(), 7);
            test.equal(gd.getSeconds(), 12);
            test.equal(gd.getMilliseconds(), 123);
            test.done();
        });

    },

    testHanDatePromiseConstructorFull: function(test) {
        test.expect(10);
        HanDate.create({
            year: 4711,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(hd) {
            test.ok(hd !== null);

            test.equal(hd.getYears(), 4711);
            test.equal(hd.getMonths(), 9);
            test.equal(hd.getDays(), 23);
            test.equal(hd.getHours(), 16);
            test.equal(hd.getMinutes(), 7);
            test.equal(hd.getSeconds(), 12);
            test.equal(hd.getMilliseconds(), 123);
            test.equal(hd.getCycles(), 78);
            test.equal(hd.getCycleYears(), 31);
            test.done();
        });

    },

    testHebrewDatePromiseConstructorFull: function(test) {
        test.expect(8);
        HebrewDate.create({
            year: 2011,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(hd) {
            test.ok(hd !== null);

            test.equal(hd.getYears(), 2011);
            test.equal(hd.getMonths(), 9);
            test.equal(hd.getDays(), 23);
            test.equal(hd.getHours(), 16);
            test.equal(hd.getMinutes(), 7);
            test.equal(hd.getSeconds(), 12);
            test.equal(hd.getMilliseconds(), 123);
            test.done();
        });

    },

    testIslamicDatePromiseConstructorFull: function(test) {
        test.expect(8);
        IslamicDate.create({
            year: 2011,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(id) {
            test.ok(id !== null);

            test.equal(id.getYears(), 2011);
            test.equal(id.getMonths(), 9);
            test.equal(id.getDays(), 23);
            test.equal(id.getHours(), 16);
            test.equal(id.getMinutes(), 7);
            test.equal(id.getSeconds(), 12);
            test.equal(id.getMilliseconds(), 123);
            test.done();
        });

    },

    testJulDatePromiseConstructorFull: function(test) {
        test.expect(8);
        JulianDate.create({
            year: 2011,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(jul) {
            test.ok(jul !== null);

            test.equal(jul.getYears(), 2011);
            test.equal(jul.getMonths(), 9);
            test.equal(jul.getDays(), 23);
            test.equal(jul.getHours(), 16);
            test.equal(jul.getMinutes(), 7);
            test.equal(jul.getSeconds(), 12);
            test.equal(jul.getMilliseconds(), 123);
            test.done();
        });

    },

    testPersAlgoDatePromiseConstructorFull: function(test) {
        test.expect(8);
        PersianAlgoDate.create({
            year: 1392,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(pd) {
            test.ok(pd !== null);

            test.equal(pd.getYears(), 1392);
            test.equal(pd.getMonths(), 9);
            test.equal(pd.getDays(), 23);
            test.equal(pd.getHours(), 16);
            test.equal(pd.getMinutes(), 7);
            test.equal(pd.getSeconds(), 12);
            test.equal(pd.getMilliseconds(), 123);
            test.done();
        });

    },

    testPersDateAstroAsyncConstructorFull: function(test) {
        test.expect(8);
        PersianDate.create({
            year: 1392,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(pd) {
            test.ok(pd !== null);

            test.equal(pd.getYears(), 1392);
            test.equal(pd.getMonths(), 9);
            test.equal(pd.getDays(), 23);
            test.equal(pd.getHours(), 16);
            test.equal(pd.getMinutes(), 7);
            test.equal(pd.getSeconds(), 12);
            test.equal(pd.getMilliseconds(), 123);
            test.done();
        });

    },

    testThaiSolarDatePromiseConstructorFull: function(test) {
        test.expect(8);
        ThaiSolarDate.create({
            year: 2553,
            month: 9,
            day: 23,
            hour: 16,
            minute: 7,
            second: 12,
            millisecond: 123,
            timezone: "Etc/UTC",
            sync: false
        }).then(function(td) {
            test.ok(td !== null);

            test.equal(td.getYears(), 2553);
            test.equal(td.getMonths(), 9);
            test.equal(td.getDays(), 23);
            test.equal(td.getHours(), 16);
            test.equal(td.getMinutes(), 7);
            test.equal(td.getSeconds(), 12);
            test.equal(td.getMilliseconds(), 123);
            test.done();
        });
    },

    testCalendarPromiseFactoryAsync: function(test) {
        test.expect(2);
        var cal = CalendarFactoryAsync({
            locale: "th-TH"
        }).then(function(cal) {
            test.ok(typeof(cal) !== "undefined");

            test.equal(cal.getType(), "thaisolar");
            test.done();
        });
    }
};

/*
 * testdatefmtinfoasync.js - test the date formatter info object asynchronously
 *
 * Copyright © 2019, JEDLSoft
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
import DateFmtInfo from "../lib/DateFmtInfo.js";
import DateFactory from "../lib/DateFactory.js";

module.exports.testdatefmtinfoasync = {
    testDateFmtInfoConstructorEmpty: function(test) {
        test.expect(1);
        new DateFmtInfo({
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);
                test.done();
            }
        });
    },

    testDateFmtInfoGetMonthsOfYearThai: function(test) {
        test.expect(2);
        // uses ThaiSolar calendar
        new DateFmtInfo({
            locale: "th-TH",
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);

                var arrMonths = fmt.getMonthsOfYear({length: "long"});

                var expected = [undefined, "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
                test.deepEqual(arrMonths, expected);
                test.done();
            }
        });
    },

    testDateFmtInfoGetDateComponentOrderENGB: function(test) {
        test.expect(2);

        new DateFmtInfo({
            locale: "en-GB",
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);
                
                test.equal(fmt.getDateComponentOrder(), "dmy");
                test.done();
            }
        });
    },

    testDateFmtInfoGetDaysOfWeekOtherCalendar: function(test) {
        test.expect(2);
        new DateFmtInfo({
            locale: "en-US", 
            calendar: "hebrew",
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);
                
                var arrDays = fmt.getDaysOfWeek({length: 'long'});
                
                var expected = ["ris", "she", "shl", "rvi", "ḥam", "shi", "sha"];
                test.deepEqual(arrDays, expected);
                test.done();
            }
        });
    },

    testDateFmtGetFormatInfoGregorianTranslatedAsync: function(test) {
        test.expect(16);

        new DateFmtInfo({
            locale: "en-US",
            type: "date",
            length: "full",
            uiLocale: "de-DE",
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);

                fmt.getFormatInfo({
                    year: 2019,
                    sync: false,
                    onLoad: function(info) {
                        test.ok(info);

                        test.equal(info.length, 5);

                        test.equal(info[0].component, "month");
                        test.equal(info[0].label, "Monat");
                        test.deepEqual(info[0].constraint, [
                            {label: "Januar", value: 1},
                            {label: "Februar", value: 2},
                            {label: "März", value: 3},
                            {label: "April", value: 4},
                            {label: "Mai", value: 5},
                            {label: "Juni", value: 6},
                            {label: "Juli", value: 7},
                            {label: "August", value: 8},
                            {label: "September", value: 9},
                            {label: "Oktober", value: 10},
                            {label: "November", value: 11},
                            {label: "Dezember", value: 12},
                            ]);

                        test.ok(!info[1].component);
                        test.equal(info[1].label, " ");

                        test.equal(info[2].component, "day");
                        test.equal(info[2].label, "Tag");
                        test.deepEqual(info[2].constraint, {
                            "1": [1, 31],
                            "2": [1, 28],
                            "3": [1, 31],
                            "4": [1, 30],
                            "5": [1, 31],
                            "6": [1, 30],
                            "7": [1, 31],
                            "8": [1, 31],
                            "9": [1, 30],
                            "10": [1, 31],
                            "11": [1, 30],
                            "12": [1, 31]
                        });

                        test.ok(!info[3].component);
                        test.equal(info[3].label, ", ");

                        test.equal(info[4].component, "year");
                        test.equal(info[4].label, "Jahr");
                        test.equal(info[4].constraint, "\\d{4}");
                        test.done();
                    }
                });
            }
        });
    },
    
    testDateFmtInfoGetFormatInfoUSFullAllFieldsAsync: function(test) {
        test.expect(172);

        new DateFmtInfo({
            locale: "en-US",
            type: "datetime",
            length: "full",
            date: "wmdy",
            time: "ahmsz",
            sync: false,
            onLoad: function(fmt) {
                test.ok(fmt !== null);
                
                fmt.getFormatInfo({
                    sync: false,
                    year: 2019, // non leap year
                    onLoad: function(info) {
                        test.ok(info);
                        
                        test.equal(info.length, 17);
                        
                        test.equal(info[0].label, "Day of Week"),
                        test.equal(typeof(info[0].value), "function");
                        
                        test.ok(!info[1].component);
                        test.equal(info[1].label, ", ");
                        
                        test.equal(info[2].component, "month");
                        test.equal(info[2].label, "Month");
                        test.deepEqual(info[2].constraint, [
                            {label: "January", value: 1},
                            {label: "February", value: 2},
                            {label: "March", value: 3},
                            {label: "April", value: 4},
                            {label: "May", value: 5},
                            {label: "June", value: 6},
                            {label: "July", value: 7},
                            {label: "August", value: 8},
                            {label: "September", value: 9},
                            {label: "October", value: 10},
                            {label: "November", value: 11},
                            {label: "December", value: 12}
                        ]);
                        
                        test.ok(!info[3].component);
                        test.equal(info[3].label, " ");
                        
                        test.equal(info[4].component, "day");
                        test.equal(info[4].label, "Day");
                        test.deepEqual(info[4].constraint, {
                            "1": [1, 31],
                            "2": [1, 28],
                            "3": [1, 31],
                            "4": [1, 30],
                            "5": [1, 31],
                            "6": [1, 30],
                            "7": [1, 31],
                            "8": [1, 31],
                            "9": [1, 30],
                            "10": [1, 31],
                            "11": [1, 30],
                            "12": [1, 31]
                        });
                        test.equal(info[4].validation, "\\d{1,2}");
                        
                        test.ok(!info[5].component);
                        test.equal(info[5].label, ", ");
                        
                        test.equal(info[6].component, "year");
                        test.equal(info[6].label, "Year");
                        test.equal(info[6].placeholder, "YYYY");
                        test.equal(info[6].constraint, "\\d{4}");
                        
                        test.ok(!info[7].component);
                        test.equal(info[7].label, " at ");
                        
                        test.equal(info[8].component, "hour");
                        test.equal(info[8].label, "Hour");
                        test.equal(info[8].placeholder, "H");
                        test.deepEqual(info[8].constraint, ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
                        test.equal(info[8].validation, "\\d{1,2}");
                        
                        test.ok(!info[9].component);
                        test.equal(info[9].label, ":");
                        
                        test.equal(info[10].component, "minute");
                        test.equal(info[10].label, "Minute");
                        test.equal(info[10].placeholder, "mm");
                        for (var i = 0; i < 60; i++) {
                            test.equal(Number(info[10].constraint[i]), i);
                        }
                        test.equal(info[10].validation, "\\d{2}");
                        
                        test.ok(!info[11].component);
                        test.equal(info[11].label, ":");
                        
                        test.equal(info[12].component, "second");
                        test.equal(info[12].label, "Second");
                        test.equal(info[12].placeholder, "ss");
                        for (var i = 0; i < 60; i++) {
                            test.equal(Number(info[12].constraint[i]), i);
                        }
                        test.equal(info[12].validation, "\\d{2}");
                        
                        test.ok(!info[13].component);
                        test.equal(info[13].label, " ");
                        
                        test.equal(info[14].component, "meridiem");
                        test.equal(info[14].label, "AM/PM");
                        test.deepEqual(info[14].constraint, ["AM", "PM"]);
                        
                        test.ok(!info[15].component);
                        test.equal(info[15].label, " ");
                        
                        test.equal(info[16].component, "timezone");
                        test.equal(info[16].label, "Time zone");
                        test.equal(typeof(info[16].constraint), "object");
                        test.equal(info[16].constraint.length, 511);
                    }
                });
                
                test.done();
            }
        });
    }
};
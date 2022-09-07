/*
 * testunitfmtpromise.js - test the units formatter object
 * 
 * Copyright © 2018-2019, 2022 JEDLSoft
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

import UnitFmt from "../src/UnitFmt.js";
import MeasurementFactory from "../src/MeasurementFactory.js";

export const testunitfmtpromise = {
    testUnitFormatWithScale1: function(test) {
        test.expect(1);
        var m = MeasurementFactory({
            amount: 3000,
            unit: "meter"
        });
        UnitFmt.create({
            autoConvert: false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m);    
            test.equal(str, "3 kilometers");
            test.done();
        });  
    },

    testUnitFormatWithoutScale5: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "kilowatt hour",
            amount: 1233453
        });

        UnitFmt.create({
            autoScale: false, 
            autoConvert:false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);    
            test.equal(str, "1,233,453 kilowatt-hours");
            test.done();
        }); 
    },

    testUnitFormatWithScale11: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "krunghoonfoop",
            amount: 2
        });

        UnitFmt.create({
            autoConvert:false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "2 krunghoonfoop");
            test.done();
        }); 
    },

    testUnitFormatArea2: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "square centimeter",
            amount: 2
        });

        UnitFmt.create({
            locale: "ru-RU",
            autoConvert: false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "2 квадратных сантиметра");
            test.done();
        });
    },

    testUnitFormatArea4: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        UnitFmt.create({
            locale: "ko-KR",
            autoConvert: false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "1,000제곱센티미터");
            test.done();
        });
    },

    testUnitFormatArea5: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "square centimeter",
            amount: 1000
        });

        UnitFmt.create({
            locale: "fr-FR",
            autoConvert: false,
            scale: false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "1 000 centimètres carrés");
            test.done();
        });
    },

    testUnitFormatPower: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "kW",
            amount: 1000
        });

        UnitFmt.create({
            locale: "fr-FR",
            autoConvert: false,
            sync: false
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "1 mégawatt");
            test.done();
        });
    },

    testUnitFormatPressure: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "Pa",
            amount: 1000
        });

        UnitFmt.create({
            locale: "de-DE",
            autoConvert: false,
            autoScale: false,
            sync: false,
            length: "long"
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "1.000 Pascal");
            test.done();
        });
    },

    testUnitFormatForce: function(test) {
        test.expect(1);
        var m1 = MeasurementFactory({
            unit: "N",
            amount: 100
        });

        UnitFmt.create({
            locale: "ja-JP",
            autoConvert: false,
            sync: false,
            length: "long"
        }).then(function(fmt) {
            var str = fmt.format(m1);
            test.equal(str, "100 ニュートン");
            test.done();
        });
    }
};

/*
 * testresourcesasync.js - test the Resources object
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

import ResBundle from "../lib/ResBundle.js";
import Locale from "../lib/Locale.js";

import path from 'path';

module.exports.testresourcespromise = {
    testResBundleAsyncConstructorEmpty: function(test) {
        test.expect(2);
        ilib.clearPseudoLocales();

        new ResBundle({
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            test.equal(rb.getName(), "strings");
            test.done();
        });
    },

    testResBundleAsyncConstructorOtherLocale: function(test) {
        test.expect(2);
        new ResBundle({
            locale: "de-DE",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            var loc = rb.getLocale();

            test.equal(loc.toString(), "de-DE");
            test.done();
        });
    },

    testResBundleAsyncGetStringOtherBundleesMX: function(test) {
        if (ilib._getPlatform() !== "nodejs" || !ilib._dyndata || !ilib._dyncode) {
            test.done();
            return;
        }

        test.expect(4);

        // clear this to be sure it is actually loading something
        //ilib.data.strings = undefined;
        //ilib.data.strings_es = undefined;
        //ilib.data.strings_und_MX = undefined;
        //ilib.data.strings_es_MX = undefined;

        var base = path.relative(process.cwd(), path.resolve(__dirname, "./resources"));

        new ResBundle({
            locale: "es-MX",
            sync: false,
            loadParams: {
                base: base
            }
        }).then(function(rb) {
            test.ok(rb !== null);

            test.equal(rb.getStringJS("Hello from {country}"), "Que tal de {country}");
            test.equal(rb.getStringJS("Hello from {city}"), "Que tal de {city}");
            test.equal(rb.getStringJS("Greetings from {city} in {country}"), "Hola de {city} en {country}");
            test.done();
        });

    },

    testResBundleAsyncGetStringOtherBundlePsuedoRaw: function(test) {
        test.expect(4);
        new ResBundle({
            name: "tester",
            locale: "zxx-XX",
            type: "raw",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            // should not pseudo-ize the replacement parameter names
            test.equal(rb.getString("Hello from {country}").toString(), "Ħëľľõ fŕõm {çõüñţŕÿ}");
            test.equal(rb.getString("Hello from {city}").toString(), "Ħëľľõ fŕõm {çíţÿ}");
            test.equal(rb.getString("Greetings from {city} in {country}").toString(), "Ĝŕëëţíñğš fŕõm {çíţÿ} íñ {çõüñţŕÿ}");
            test.done();
        });
    },

    testResBundleAsyncGetStringNonExistantTranslations: function(test) {
        test.expect(2);
        new ResBundle({
            name: "tester",
            locale: "zh-CN",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            // should return source
            test.equal(rb.getString("foobar").toString(), "foobar");
            test.done();
        });
    },

    testResBundleAsyncGetStringNoResourcesReturnSource: function(test) {
        test.expect(2);
        new ResBundle({
            name: "tester",
            locale: "zz-ZZ",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            test.equal(rb.getString("This is a test.").toString(), "This is a test.");
            test.done();
        });
    },

    testResBundleAsyncGetStringCyrlPsuedoRaw: function(test) {
        test.expect(4);
        new ResBundle({
            name: "tester",
            locale: "zxx-Cyrl-XX",
            type: "raw",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            // should pseudo-ize the replacement parameter names
            test.equal(rb.getString("Hello from {country}").toString(), "Хэлло фром {чоунтря}");
            test.equal(rb.getString("Hello from {city}").toString(), "Хэлло фром {читя}");
            test.equal(rb.getString("Greetings from {city} in {country}").toString(), "Грээтингс фром {читя} ин {чоунтря}");
            test.done();
        });

    },

    testResBundleAsyncGetStringHansPsuedoText: function(test) {
        test.expect(4);
        new ResBundle({
            name: "tester",
            locale: "zxx-Hans-XX",
            type: "text",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            // should not pseudo-ize the replacement parameter names
            // for Chinese scripts, remove the spaces to the simulate Chinese writing style
            test.equal(rb.getString("Hello from {country}").toString(), "和俄了了夥凡熱夥们{country}");
            test.equal(rb.getString("Hello from {city}").toString(), "和俄了了夥凡熱夥们{city}");
            test.equal(rb.getString("Greetings from {city} in {country}").toString(), "个熱俄俄推意尼个思凡熱夥们{city}意尼{country}");
            test.done();
        });

    },

    testResBundleAsyncGetStringHebrPsuedoText: function(test) {
        test.expect(4);
        new ResBundle({
            name: "tester",
            locale: "zxx-Hebr-XX",
            type: "text",
            sync: false
        }).then(function(rb) {
            test.ok(rb !== null);

            // should not pseudo-ize the replacement parameter names
            test.equal(rb.getString("Hello from {country}").toString(), "הֶללֹ פרֹמ {country}");
            test.equal(rb.getString("Hello from {city}").toString(), "הֶללֹ פרֹמ {city}");
            test.equal(rb.getString("Greetings from {city} in {country}").toString(), "גרֶֶטִנגס פרֹמ {city} ִנ {country}");
            test.done();
        });

    },

    testResBundleAsyncPseudo_euES: function(test) {
        test.expect(1);
        ilib.clearPseudoLocales();
        ilib.setAsPseudoLocale("eu-ES");
        new ResBundle({
            locale:'eu-ES',
            sync: false
        }).then(function(rb) {
            test.equal(rb.getString("This is psuedo string test").toString(), "Ťĥíš íš þšüëðõ šţŕíñğ ţëšţ");
            test.done();
            ilib.clearPseudoLocales();
        });
    },

    testResBundleAsyncPseudo_psAF: function(test) {
        test.expect(1);
        ilib.clearPseudoLocales();
        ilib.setAsPseudoLocale("ps-AF");
        new ResBundle({
            locale:'ps-AF',
            sync: false
        }).then(function(rb) {
            test.equal(rb.getString("This is psuedo string test").toString(), "טהִס ִס פסֶֻדֹ סטרִנג טֶסט");
            test.done();
            ilib.clearPseudoLocales();
        });
    }
};

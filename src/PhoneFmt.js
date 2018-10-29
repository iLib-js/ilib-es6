/**
 * PhoneFmt.js - ES6 wrappers around an ilib class
 *
 * @license
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

import { promisifyFunction } from './promisify';

const ilibPhoneFmt = require('ilib/lib/PhoneFmt.js');

function wrapFormat(phoneFmt) {
    if (!phoneFmt) return;

    const oldFormat = ilibPhoneFmt.prototype.format.bind(phoneFmt);
    phoneFmt.format = function(number, options = {}) {
        const { sync } = options;
        if (typeof(sync) === "undefined" || sync) {
            return oldFormat(number, options);
        }

        return promisifyFunction(function(opts = {}) {
            const { number } = opts;
            return oldFormat(number, opts);
        }, Object.assign({}, options, {
            number: number
        }));
    };

    return phoneFmt;
}

export default class PhoneFmt {
    constructor(options = {}) {
        return promisifyFunction(function(options = {}) {
            return wrapFormat(new ilibPhoneFmt(options));
        }, options);
    }
};

/**
 * DateFmtInfo.js - ES6 wrappers around an ilib class
 *
 * @license
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

import promisify, {promisifyFunction} from './promisify';

const ilibDateFmtInfo = require('ilib/lib/DateFmtInfo.js');

function wrapGetFormatInfo(formatter) {
    if (!formatter) return;

    const oldGetFormatInfo = ilibDateFmtInfo.prototype.getFormatInfo.bind(formatter);
    formatter.getFormatInfo = function(options) {
        if (typeof(sync) === "undefined" || sync) {
            return oldGetFormatInfo(options);
        }

        return promisify(oldGetFormatInfo, options);
    };

    return formatter;
}

export default class DateFmtInfo {
    constructor(options = {}) {
        return wrapGetFormatInfo(new ilibDateFmtInfo(options));
    }

    static create(options = {}) {
        return new Promise(function(resolve, reject) {
            let tempOptions = Object.assign({}, options, {
                sync: false,
                onLoad: dfi => resolve(wrapGetFormatInfo(dfi))
            });
            new ilibDateFmtInfo(tempOptions);
        });
    }
};

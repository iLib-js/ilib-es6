/**
 * Address.js - ES6 wrappers around an ilib class
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

import promisify from './promisify';

let ilibAddress = require('ilib/lib/Address.js');

export default class Address {
    constructor(address, options = {}) {
        const { sync } = options;
        if (typeof(sync) === 'boolean' && !sync) {
            const { onLoad } = options;
            return new Promise(function(resolve, reject) {
                let tempOptions = { ...options };
                tempOptions.onLoad = function(address) {
                    if (address) {
                        resolve(address);
                    } else {
                        reject();
                    }
                }
                new ilibAddress(address, tempOptions);
            }).then(onLoad);
        }

        return new ilibAddress(address, options);
    }
};

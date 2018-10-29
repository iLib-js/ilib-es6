/**
 * ScriptInfo.js - ES6 wrappers around an ilib class
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

const ilibScriptInfo = require('ilib/lib/ScriptInfo.js');

export default class ScriptInfo {
    constructor(script, options = {}) {
        return promisifyFunction(function(opts = {}) {
            const { script } = opts;
            return new ilibScriptInfo(script, opts);
        }, Object.assign({}, options, {
            script: script
        }));
    }
    
    static getAllScripts(sync, loadParams, callback) {
        if (typeof(sync) === "undefined" || sync) {
            return ilibScriptInfo.getAllScripts(sync, loadParams, callback);
        }

        return promisifyFunction(function(options = {}) {
            const {loadParams, onLoad} = options;
            return ilibScriptInfo.getAllScripts(false, loadParams, onLoad);
        }, {
            loadParams: loadParams,
            sync: false,
            onLoad: callback
        });
    }
};


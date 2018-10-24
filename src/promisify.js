/**
 * promisify - convert an ilib-style callback class to a promise
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

export function promisifyFunction(func, options = {}) {
    const { sync, onLoad, ...rest } = options;
    if (typeof(sync) === 'boolean' && !sync) {
        let tempOptions = {
            sync: sync,
            ...rest
        };
        let promise = new Promise(function(resolve, reject) {
            tempOptions.onLoad = function(result) {
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            }
            func(tempOptions);
        });
        if (onLoad) {
            promise.then(onLoad);
        }
        promise.catch(function(err) {
            console.log("Error caught: " + err);
            if (onLoad) onLoad(undefined);
            return err;
        });
        return promise;
    }

    return func(options);
}

export default function promisify(func, options = {}) {
    return promisifyFunction(function() {
        return new func(options);
    }, options);
};

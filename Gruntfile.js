/**
 * Gruntfile.js - build the ilib-es6 project
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

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'lib/'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-env'],
                minified: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.mjs'],
                    dest: 'lib/',
                    ext: '.js'
                },{
                    'ilib.js': 'ilib-es6.mjs'
                }]
            }
        },
        clean: {
            dist: ['lib']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['babel']);
    grunt.registerTask('uglify', ['uglify']);
};

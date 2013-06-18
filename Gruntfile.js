module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/* <%= pkg.name %> v<%= pkg.version %> (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <%= pkg.homepage %> */'
            },
            build: {
                src: '<%= buildSourceFile %>',
                dest: '<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            options: {
                "es5": true,
                "curly": true,
                "strict": false,
                "onevar": false,
                "eqeqeq": true,
                "jquery": true,
                "indent": 4,
                "laxcomma": true,
                "laxbreak": true,
                "undef": true,
                "unused": true,
                "latedef": true,
                "immed": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "boss": true,
                "eqnull": true,
                "node": true,
                "browser": true,
                "plusplus": false,
                "smarttabs": true,
                "evil": true,
                "globals": {
                    "global": true,
                    "process": true,
                    "console": true,
                    "Buffer": true,
                    "require": true,
                    "__filename": true,
                    "__dirname": true,
                    "module": true,
                    "exports": true
                }
            },
            
            src: ['Gruntfile.js', '<%= sourceFiles %>', '<%= testFiles %>']
        },

        watch: {
            files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'package.json'],
            tasks: ['jshint', 'mocha', 'uglify']
        },

        bumpup: ['package.json', 'bower.json', 'component.json'],

        release: {
            options: {
                bump: false, //default: true
                tagName: 'v<%= version %>', //default: '<%= version %>'
                commitMessage: 'release v<%= version %>', //default: 'release <%= version %>'
                tagMessage: 'tagging version v<%= version %>' //default: 'Version <%= version %>'
            }
        },

        // files
        buildSourceFile: 'lib/index.js',
        sourceFiles: 'lib/**/*.js',
        testFiles: 'test/**/*.js'
    });

    grunt.registerTask('mocha', 'run mocha', function () {
        var done = this.async();
        require('child_process').exec('mocha', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });

    grunt.event.on('watch', function (action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-bumpup');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jshint', 'mocha']);

};
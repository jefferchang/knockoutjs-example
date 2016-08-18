/**
 * Created by Administrator on 2016/8/18.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'app/*.js',
                dest: 'build/test.min.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['app/js/*'],
                        dest: 'dest/' ,
                        expand: true,
                        flatten: true
                    },
                    {
                        src: ['app/js2/*'],
                        dest: 'dest/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ],
            },
        },
        log: {
            foo: [1, 2, 3],
            bar: 'hello world',
            baz: false
        },
        clean: {
        folder: ['dest/'],
        contents:['build/*']

    }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Default task(s).
    grunt.registerMultiTask('log', 'Log stuff.', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    });
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('copyTest', ['copy:main']);//不能用copy 来命名
    grunt.registerTask('cleanTest', ['clean']);
};
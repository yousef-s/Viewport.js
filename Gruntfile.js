module.exports = function(grunt) {
    grunt.initConfig({
        jasmine: {
            dev: {
                src: 'src/js/**/*.js',
                options: {
                    specs: 'src/tests/*Spec.js'
                }
            }
        },
        uglify: {
            prod: {
                files: {
                    'src/js/Viewport.min.js': 'src/js/Viewport.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jasmine:dev']);
    grunt.registerTask('prod', ['uglify:prod']);
};
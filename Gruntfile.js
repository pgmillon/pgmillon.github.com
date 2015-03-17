'use strict';

var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    less: {
      production: {
        options: {
          paths: [
            "css",
            "bower_components"
          ],
          yuicompress: true
        },
        files: {
          "css/main.css": "css/main.less"
        }
      }
    },

    exec: {
      jekyll: {
        cmd: 'jekyll build --trace'
      },

      pdf: {
        cmd: 'node_modules/.bin/phantomjs _site/js/html2pdf.js'
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      less: {
        files: 'css/*.less',
        tasks: ['less']
      },

      jekyll: {
        files: [
          '**/*.haml',
          '_data/**/*.yml',
          'css/*.css',
          'js/*.js',
          '_config.yml',
          '_plugins/*.rb',
          '!_site/**/*.html'
        ],
        tasks: ['exec:jekyll'],
        options: {
          livereload: LIVERELOAD_PORT
        }
      }
    },

    connect: {
      livereload: {
        options: {
          port: 8000,
          base: '_site',
          keepalive: false,
          livereload: LIVERELOAD_PORT
        }
      }
    }

  });

  grunt.registerTask('build', [
    'less',
    'exec:jekyll']);

  grunt.registerTask('serve', [
    'build',
    'connect:livereload',
    'watch']);

  grunt.registerTask('pdf', ['exec:pdf'])

  grunt.registerTask('default', ['serve']);
};

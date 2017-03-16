'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dist: 'dist',

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= dist %>/*']
        }]
      },
      server: '.tmp'
    },
    copy: {
      dev: {
        files: [{
            expand: true,
            cwd: 'src', 
            src: [
              'html/*',
              'js/*',
              'index.html'
            ], 
            dest: 'dist',
            filter: 'isFile',
            dot: false
        }, {
            expand: true,
            flatten: true,
            cwd: 'bower_components', 
            src: [
              'angular-ui-router/release/angular-ui-router.js',
              'angular/angular.js'
            ], 
            dest: 'dist/js',
            filter: 'isFile',
            dot: false
        }]
      }
    },


    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/html/*.html','index.html'],
        tasks: ['clean:dist', 'copy']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['clean:dist', 'copy']
      }
/*
,
      css: {
        files: ['src/sass/*.scss'],
        tasks: ['compass', 'cssmin']
      }
*/
    },


    connect: {
      hoge:{
        options: {
          base:'dist',
          keepalive: true,
          port: 8080,
          hostname: 'localhost'
        }
      }
    },


    open: {
      server: {
        path: 'http://localhost:'
      }
    },

replace: {
    development: {
      options: {
        patterns: [{
          json: grunt.file.readJSON('./config/environments/development.json')
        }]
      },
      files: [{
        expand: true,
        flatten: true,
        src: ['./src/js/app.js'],
        dest: './src/js/'
//        dest: './build/'
      }]
    },
    production: {
      options: {
        patterns: [{
          json: grunt.file.readJSON('./config/environments/production.json')
        }]
      },
      files: [{
        expand: true,
        flatten: true,
        src: ['./src/js/app.js'],
        dest: './src/js/'
//        dest: './build/'
      }]
    }
    }



  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('default', ['clean:dist', 'copy', 'connect', 'open', 'watch']);
}

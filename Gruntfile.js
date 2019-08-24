/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        files: {
          'public_html/style.css': 'source/style/*.scss'
        }
      },
      rel: {
        options: {
          sourcemap:'none',
          style: 'compressed'
        },
        files: {
          'release_html/style.css': 'source/style/*.scss'
        }
      }
    },
    watch: {
      css: {
        files: 'source/**/*.scss',
        tasks: ['sass:dev']
      },
      js: {
        files: ['source/**/*.js'],
        tasks: ['terser:dev']
      },
      html: {
        files: ['source/**/*.html'],
        tasks: ['minifyHtml:htmldev']
      }
    },
    terser: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          sourceMap: true,
        },
        files: {
          'public_html/scripts.js': [
            'source/js/*.js'
          ]
        }
      },
      rel: {
        options: {
          mangle: false,
          sourceMap: false,
          compress: true,
        },
        files: {
          'release_html/scripts.js': [
            'source/js/*.js'
          ]
        }
      }
    },
    minifyHtml: {
      htmldev: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['**'],
          dest: 'public_html/'
        }]
      },
      htmlrel: {
        files: [{
          expand: true,
          cwd: 'source/html',
          src: ['**'],
          dest: 'release_html/'
        }]
      }
    },
    compress: {
      makezip: {
        options: {
          archive: 'release.zip'
        },
        files: [{
            src: ['release_html/*'],
            dest: '/'
          } ]
      }
    },
    open: {
      game: {
        path: 'http://localhost:8282',
        app: 'chrome'
      }
    },
    'http-server': {
      local: {
        root: 'public_html',
        host: '0.0.0.0',
        runInBackground: true
      },
      localhold: {
        root: 'public_html',
        port: 8282,
        host: '127.0.0.1',
        runInBackground: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-minify-html');

  grunt.registerTask('develop', ['sass:dev', 'terser:dev', 'minifyHtml:htmldev', 'http-server:local', 'open', 'watch']);
  grunt.registerTask('release', ['sass:rel', 'terser:rel', 'minifyHtml:htmlrel','compress:makezip']);
};

module.exports = function (grunt) {

    require('matchdep').filterAll("grunt-*").forEach(grunt.loadNpmTasks);
  
    grunt.initConfig({
  
      copy: {
        js: {
          expand: true,
          cwd: './',
          src: 'justgage.js',
          dest: 'dist/'
        }
      },
  
    //   jshint: {
    //     files: [
    //       'Gruntfile.js',
    //       'src/js/*.js'
    //     ],
  
    //     options: {
    //       globals: {
    //         console: true
    //       }
    //     }
    //   },
  
      uglify: {
        options: {
          mangle: true,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          },
          sourceMap: true,
          sourceMapName: 'dist/justgage.min.js.map',
          preserveComments: 'some'
        },
        js: {
          files: {
            'dist/justgage.min.js': ['./justgage.js']
          }
        }
      }  
    });
  
    grunt.registerTask('build', [
     // 'jshint',
      'copy',
      'uglify',
    ]);
  };
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    manifest: {
        generate: {
          options: {
            basePath: './',
            cache: [],
            preferOnline: true,
            verbose: true,
            timestamp: true,
            hash: true,
            master: ['index.html']
          },
          src: [
            'index.html',
              'js/*'
          ],
          dest: 'manifest.appcache'
        }
      },
    copy: {
          main: {
            files: [{
              expand: true,
              dest: 'dest/',
              src: [
                'index.html',
                'js/**',
                'server.php'
              ]
            }]
          }
        }
  });
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};




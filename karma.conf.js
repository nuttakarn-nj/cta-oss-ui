// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('@angular/cli/plugins/karma'),
    ],
    files: [
      //material theme
      { pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css' }
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222',
        ]
      },
      PhantomJS_custom: {
        base: 'PhantomJS',
        options: {
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },
    browserDisconnectTimeout: 10000,
    processKillTimeout: 20000,
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    browsers: [
      'Chrome',
      'ChromeHeadless',
      'PhantomJS',
      'PhantomJS_custom'
    ],
    singleRun: false
  });
};

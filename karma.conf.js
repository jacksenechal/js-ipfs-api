module.exports = function (config) {
  if (!process.env.DEBUG) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
      process.exit(1)
    }
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'firefox'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'safari'
    },
    'SL_Edge': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'microsoftedge'
    },
    'SL_IE11': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'internet explorer',
      version: '11.0'
    }
  }

  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: [
      'test/tests.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [
        'brfs',
        ['babelify', {presets: ['es2015']}]
      ]
    },

    sauceLabs: {
      testName: 'node-ipfs-api',
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      }
    },

    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: process.env.DEBUG ? config.LOG_DEBUG : config.LOG_INFO,
    autoWatch: false,
    customLaunchers: customLaunchers,
    browsers: process.env.DEBUG ? ['Chrome'] : Object.keys(customLaunchers),
    singleRun: false,
    concurrency: 2,
    browserNoActivityTimeout: 600000
  })
}

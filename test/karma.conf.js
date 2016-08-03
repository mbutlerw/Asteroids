module.exports = function(config){
  config.set({

    basePath: '../',

    files: [
      'public/**/!(run-game).js',
      'test/**/*.js'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'public/**/!(run-game).js': ['coverage']
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};

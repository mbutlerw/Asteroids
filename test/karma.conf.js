module.exports = function(config){
  config.set({

    basePath: '../',

    files: [
      'src/game.js',
      'test/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};

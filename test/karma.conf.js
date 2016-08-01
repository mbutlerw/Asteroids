module.exports = function(config){
  config.set({

    basePath: '../',

    files: [
      'public/src/asteroid.js',
      'public/src/bullet.js',
      'public/src/game.js',
      'public/src/keyboard.js',
      'public/src/numberGenerator.js',
      'public/src/player.js',
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

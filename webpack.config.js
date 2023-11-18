const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  target: [ 'web' ],
  mode: 'none',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      /*
      templateParameters: {
        title: 'Nottingham Tram Station Guessing Game',
        description: 'There are 50 stations on the Nottingham tram system.  Can you name them all?  A fun interactive map game by Simon Prickett built with Cloudflare Pages and Workers.',
        url: 'https://tramgame.simonprickett.dev',
        inputHelpText: 'Enter the name of a Nottingham Tram station.',
        alreadyFoundText: 'You\'ve already found this station!',
        progressText: '0 stations (0.0%) 0 guesses',
        gitHubUrl: 'https://github.com/simonprickett/nottingham-tram-game',
        gotThemAllText: 'Congratulations! You got them all!',
        gotThemAllImageAltText: 'A tram at the Wilford Lane stop.',
        gotThemAllImageCreditText: 'Image by kind permission of <a href="https://www.instagram.com/nottstransport/">Notts Transport on Instagram</a>.'
      }*/
    }),
    new CopyPlugin({
      patterns: [
        { context: './src/', from: 'css', to: 'css' },
        { context: './src/', from: 'images', to: 'images' },
        { context: './src/', from: 'data', to: 'data' },
      ]
    }),
  ],
};
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  target: [ 'web' ],
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: './src/', from: 'index.html', to: 'index.html' },
        { context: './src/', from: 'js/fontawesome.js', to: 'js/' },
        { context: './src/', from: 'css', to: 'css' },
        { context: './src/', from: 'images', to: 'images' },
        { context: './src/', from: 'data', to: 'data' },
      ]
    }),
  ],
};
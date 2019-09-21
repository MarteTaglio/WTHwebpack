const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin([
      { from: 'static', to: './' }
    ]),
  ],
};
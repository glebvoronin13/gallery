const webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, '/src'),
  distPath = path.join(__dirname, '/dist');

module.exports = {
  watch: true,
  cache: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    stats: 'minimal',
  },
  context: srcPath,
  entry: {
    app: './index.js',
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Gallery',
      template: 'index.html',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
};

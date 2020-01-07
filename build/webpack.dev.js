const Webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackMerge = require('webpack-merge');
const path = require('path');
const config = require('../config');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = WebpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    hot: true,
    proxy: config.dev.proxyTable,
    open: config.dev.autoOpenBrowser,
    contentBase: '../dist',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    }
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
})
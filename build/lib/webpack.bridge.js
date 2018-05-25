/* eslint-disable complexity */

import webpack from 'webpack'
import { readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import merge from 'webpack-merge'
import autoprefixer from 'autoprefixer'
import mediaPacker from 'css-mqpacker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import OptimizeJsPlugin from 'optimize-js-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { config, resolvePath, getRandomInt, pack } from '../config'
import banner from './banner'

function toUpperCase(_, c) {
  return c ? c.toUpperCase() : ''
}

function classify(str) {
  return str.replace(/(?:^|[-_/])(\w)/g, toUpperCase)
}

function getStats() {
  return 'verbose';
}
const packName='bridge'
const stats = getStats();

export default entry => {
  let entries = {}
  entries[packName] = './src/bridge';

  let output = {
    filename: entry.compress ? '[name].min.js' : '[name].js',
    path: resolvePath(config.dist),
    library: classify(packName),
    libraryTarget: entry.libraryTarget
  }
  let webpackConfig = {
    output,
    entry: entries,
    resolve: {
      extensions: config.resolve,
      alias: {
        ...config.alias,
        'vue$': 'vue/dist/vue.common.js'
      }
    },
    externals: {},
    module: {
      noParse: /es6-promise\.js$/,
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    stats
  }
  if (entry.compress) {
    webpackConfig = merge({
      plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
            sequences: true,
            properties: true,
            dead_code: true,
            drop_debugger: true,
            unsafe: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            side_effects: true
          },
          output: {
            comments: false
          },
          sourceMap: false
        }),
        new OptimizeJsPlugin({
          sourceMap: false
        })
      ]
    }, webpackConfig)
  }
  webpackConfig = merge(webpackConfig, {
    plugins: [
      new webpack.BannerPlugin({
        banner: banner,
        raw: true,
        entryOnly: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  })
  return webpackConfig
}

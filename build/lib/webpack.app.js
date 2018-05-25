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

function getExtractedCSSName({ filename }) {
  if (filename) {
    return filename.replace('js', 'css')
  }

  return '[name].css'
}

function getCopyPaths() {
  let copyPaths = [{
      context: resolvePath('src/core'),
      from: '**/*',
      to: resolvePath('dist/core')
    },{
      context: resolvePath('src/pages'),
      from: '**/*',
      to: resolvePath('dist/pages')
    },{
      context: resolvePath('src/routes'),
      from: '**/*',
      to: resolvePath('dist/routes')
    }
  ]
  return copyPaths;
}

const packName = 'app'
const componentsPath = 'src/components'
const themePath = 'src/theme'
const basePath = 'src/style'
const fontPath = 'src/fonts'

const stats = getStats();
export default entry => {
  let entries = {}
  entries[packName] = './src/app';

  let output = {
    filename: entry.compress ? '[name].min.js' : '[name].js',
    path: resolvePath(config.dist),
    library: classify(packName),
    libraryTarget: entry.libraryTarget,
    chunkFilename: 'chunks/[name].[chunkhash].js'
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
    externals: {
      vue: {
        root: 'Vue',
        commonjs2: 'vue',
        amd: 'vue',
        commonjs: 'vue'
      }
    },
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

  if (entry.css) {
    const cssLoader = ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader'
    })

    const scssLoader = ExtractTextPlugin.extract({
      use: 'css-loader!sass-loader',
      fallback: 'vue-style-loader'
    })

    webpackConfig = merge({
      plugins: [
        new ExtractTextPlugin({
          allChunks: true,
          filename: getExtractedCSSName(entry)
        }),
        new OptimizeCssAssetsPlugin({
          canPrint: false
        })
      ],
      module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              extractCSS: true,
              loaders: {
                css: cssLoader,
                scss: scssLoader
              },
              postcss: [
                autoprefixer(),
                mediaPacker()
              ]
            },
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: cssLoader,
            exclude: /node_modules/
          },
          {
            test: /\.scss$/,
            loader: scssLoader,
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
            loader: 'file',
            exclude: /node_modules/
          }
        ]
      }
    }, webpackConfig)
  } else {
    webpackConfig = merge({
      module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
                css: 'vue-style-loader!css-loader',
                scss: 'vue-style-loader!css-loader!sass-loader?outputStyle=compressed'
              }
            },
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.scss$/,
            use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
            loader: 'file',
            exclude: /node_modules/
          }
        ]
      }
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
  webpackConfig.plugins.push(new CopyWebpackPlugin(getCopyPaths()))

  return webpackConfig
}

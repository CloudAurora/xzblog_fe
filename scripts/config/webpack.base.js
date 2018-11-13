const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const getClientEnvironment = require('./env');
const paths = require('./paths');
const resolveConfig = require('./resolve');
const env = getClientEnvironment();
const publicPath = process.env.PUBLIC_PATH || '/';


console.log('current node env:', chalk.cyan(process.env.NODE_ENV, '\n'));

const isProd = process.env.NODE_ENV === 'production';

module.exports = () => ({
  target: 'web',
  entry: ["babel-polyfill", paths.appIndexJs],
  output: {
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].js',
    publicPath,
    path: paths.appBuild,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: resolveConfig.resolve,
  module: {
    // noParse: /jquery|lodash|moment$/,
    rules: [{
      oneOf: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: `static/media/[name].[hash:8].[ext]`,
          },
        }, {
          test: /\.(js|jsx|mjs)$/,
          include: paths.appSrc,
          use: "babel-loader",
        }, {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
            require.resolve('css-loader'),
          ]
        },
        {
          test: /\.less$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
            require.resolve('css-loader'),
            {
              loader: require.resolve('less-loader'),
              options: {
                modifyVars: {
                  // 'icon-url': '"https://at.alicdn.com/t/font_809771_9p6mhn2ejuj"',
                },
                javascriptEnabled: true
              }
            }
          ]
        }, {
          exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: `static/[name].[hash:8].[ext]`,
          },
        },
      ]
    }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
        },
        vendor: {
          chunks: "all",
          name: 'vendor',
          test: /([\/])node_modules\1/,
          priority: 10
        },
      }
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      templateParameters: env.raw
    }),
    new webpack.DefinePlugin(env.stringified),
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new HappyPack({
    //   id: "babel",
    //   loaders: ["babel-loader?cacheDirectory"],
    //   threads: 4,
    //   threadPool: happyThreadPool,
    //   // verbose: true
    // })
    // new HardSourceWebpackPlugin({
    //   // cacheDirectory: '.hardSourceWebpackCache/'
    // }),
    // new HardSourceWebpackPlugin.ExcludeModulePlugin([
    //   {
    //     // HardSource works with mini-css-extract-plugin but due to how
    //     // mini-css emits assets, assets are not emitted on repeated builds with
    //     // mini-css and hard-source together. Ignoring the mini-css loader
    //     // modules, but not the other css loader modules, excludes the modules
    //     // that mini-css needs rebuilt to output assets every time.
    //     test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    //   }
    // ]),
    // new HardSourceWebpackPlugin.ParallelModulePlugin({
    //   // How to launch the extra processes. Default:
    //   fork: (fork, compiler, webpackBin) => fork(
    //     webpackBin(),
    //     ['--config', __filename], {
    //       silent: true,
    //     }
    //   ),
    //   // Number of workers to spawn. Default:
    //   numWorkers: () => require('os').cpus().length,
    //   // Number of modules built before launching parallel building. Default:
    //   minModules: 10,
    // }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
});
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const paths = require('./paths');
const config = require('./webpack.base')();

config.mode = "production";
config.bail = true;
config.plugins.push(new MiniCssExtractPlugin({
  filename: "static/css/[name].[contenthash].css",
  chunkFilename: "static/css/[name].[id].[contenthash].css"
}));
config.plugins.push(new ParallelUglifyPlugin({
  cacheDir: paths.appUglifyCache
}));

config.plugins.push(new ManifestPlugin({
  fileName: 'asset-manifest.json',
}));

module.exports = config;
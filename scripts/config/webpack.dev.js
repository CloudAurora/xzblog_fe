const webpack = require('webpack');
const config = require('./webpack.base')();

config.mode = 'development';
config.devtool = "source-map";
config.performance = { hints: false };

module.exports = config;
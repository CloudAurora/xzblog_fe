require('./env');

const paths = require('./paths');
const config = require('./webpack.base')();

config.mode = 'development';
config.devtool = "source-map";
config.output.path = paths.appBuild;
config.performance = { hints: false };

module.exports = config;
// for eslint-import-resolver-webpack use.
const paths = require('./paths');
module.exports = {
  resolve: {
    modules: ['node_modules'],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      "src": paths.appSrc
    }
  }
}
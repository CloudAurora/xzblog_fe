process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure environment variables are read.
require('./config/env');

const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');

const paths = require('./config/paths');
const config = require('./config/webpack.prod');




function build() {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = stats.toJson({}, true);
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
        && (typeof process.env.CI !== 'string'
          || process.env.CI.toLowerCase() !== 'false')
        && messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n'
            + 'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}



fs.emptyDirSync(paths.appBuild);

copyPublicFolder();

build();
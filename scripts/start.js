process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('./config/env');

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const app = require('./server');
const clearConsole = require('./utilities/clearConsole');
const { choosePort, createCompiler, prepareUrls } = require('./utilities/serverUtils');
const openBrowser = require('./utilities/openBrowser');
const paths = require('./config/paths');
const config = require('./config/webpack.dev');
const isInteractive = process.stdout.isTTY;


// Tools like Cloud9 rely on this.
const defaultHost = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '0.0.0.0';
if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`);
  console.log();
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort(host, defaultHost)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const urls = prepareUrls(protocol, host, port);

    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, appName, urls);

    const devMiddleware = {
      publicPath: config.output.publicPath,
      https: protocol === 'https',
      host,
      logLevel: 'error',
    }
    const hotClient = { logLevel: 'error' };
    koaWebpack({ compiler, devMiddleware, hotClient }).then(middleware => {
      app.use(middleware);
      app.use(async ctx => {
        // history fallback?
        const filename = path.resolve(config.output.path, 'index.html');
        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
      });
      app.listen(port, host, err => {
        if (err) {
          return console.log(err);
        }
        if (isInteractive) {
          clearConsole();
        }
        console.log(chalk.cyan('Starting the development server...\n'));
        openBrowser(urls.localUrlForBrowser);
      });
    })
      .catch(err => {
        if (err && err.message) {
          console.log(err.message);
        }
        process.exit(1);
      });
  });

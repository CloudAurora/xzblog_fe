const fs = require('fs');
const path = require('path');
const moment = require('moment');
const paths = require('./paths');
const YAML = require('yaml').default;

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

const env = YAML.parse(fs.readFileSync(paths.envFile, 'utf8'));
const exportToEnv = (obj) => {
  if (obj != null && typeof obj === 'object') {
    Object.assign(process.env, obj);
  }
}

exportToEnv(env.global);
exportToEnv(env[NODE_ENV]);


const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter) // Windows ;  POSIX :
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// injected into the application via DefinePlugin in Webpack configuration.
const surveyRegex = /^BROWSER_/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => surveyRegex.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
        BUILD_TIME: moment().format('YYYY-MM-DD HH:MM')
      },
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;

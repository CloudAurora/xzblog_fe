const opn = require('opn');
const execSync = require('child_process').execSync;

function getChromeCommand() {
  switch (process.platform) {
    case 'darwin':
      return 'google chrome';
    case 'win32':
      return 'chrome';
    case 'linux':
      return 'google-chrome';
    default:
      return process.env.BROWSER;
  }
}
async function startChrome(url) {
  const browser = getChromeCommand();
  const isChrome = /chrome/i.test(browser);
  if (process.platform === 'darwin' && isChrome) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
        cwd: __dirname,
        stdio: 'ignore',
      });
      console.log('open with applescript');
      return true;
    } catch (err) {
      // Ignore errors.
    }
  }
  try {
    if (isChrome) {
      const options = { app: [browser, '--remote-debugging-port=9222'] };
      console.log('open with remote debugging');
      await opn(url, options);
    } else if (browser === 'open') {
      await opn(url);
    } else {
      await opn(url, browser);
    }
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = (url) => startChrome(url);
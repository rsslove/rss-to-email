const fs = require('fs');

function loadConfig() {
  try {
    const args = process.argv.slice(2);
    const configFile = args[0] || 'config.json';

    return JSON.parse(fs.readFileSync(configFile));
  } catch (e) {
    console.error(e);
  }
}

module.exports = loadConfig;

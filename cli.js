/**
 * Entrypoint for CLI applications
 */
const Config = require('./src/Config');
const generateMjmlFromItems = require('./src/helpers/generate-mjml');
const getFeedItems = require('./src/helpers/get-feed-items');
const saveFiles = require('./src/helpers/save-files');

function loadConfig() {
  try {
    const args = process.argv.slice(2);
    return new Config(args[0] || 'config.example.json');
  } catch (e) {
    console.error(e);
  }
}

async function init() {
  const config = loadConfig();
  const items = await getFeedItems(config.feedUrl);
  const mjml = generateMjmlFromItems(items, config);
  saveFiles(mjml, config);
  console.log('Process complete');
}

init();

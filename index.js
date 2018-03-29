const config = require('./helpers/load-config')();
const generateMjmlFromItems = require('./helpers/generate-mjml');
const getFeedItems = require('./helpers/get-feed-items');
const saveFiles = require('./helpers/save-files');

async function init() {
  const items = await getFeedItems(config.feedUrl);
  const mjml = generateMjmlFromItems(items, config);
  saveFiles(mjml, config);
  console.log('Process complete');
}

init();

/**
 * Entrypoint for CLI applications
 */
const RssToJson = require('./src/index');

function init() {
  const rssToJson = new RssToJson(process.argv.slice(2)[0] || 'config.example.json');

  rssToJson.saveEmails();

  console.log('Process complete');
}

init();

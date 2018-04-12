/**
 * Entrypoint for CLI applications
 */
const RssToEmail = require('./src/index');

function init() {
  const rssToEmail = new RssToEmail(process.argv.slice(2)[0] || 'config.example.json');

  rssToEmail.saveEmails();

  console.log('Process complete');
}

init();

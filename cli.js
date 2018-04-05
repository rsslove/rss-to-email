/**
 * Entrypoint for CLI applications
 */
const Config = require('./src/Config');
const Feed = require('./src/Feed');
const Email = require('./src/Email');

async function init(Config, Feed, Email) {
  // Load the config based on CLI file or default file
  const args = process.argv.slice(2);
  const config = new Config(args[0] || 'config.example.json');

  // Create an array of feeds
  const feeds = await Promise.all(config.feeds.map(async feedConfig => {
    const feed = new Feed(feedConfig);
    return await feed.resolve();
  }));

  // Generate Emails
  const email = new Email(config, feeds);
  email.save();

  console.log('Process complete');
}

init(Config, Feed, Email);

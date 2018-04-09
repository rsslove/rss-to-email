/**
 * Entrypoint for Javascript/Node applications
 */
const Config = require('./src/Config');
const Feed = require('./src/Feed');
const Email = require('./src/Email');

class RssToEmail {

  constructor(config) {
    this.config = new Config(config);
  }

  async getEmail(format) {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);
    return format === 'mjml' ? email.getMjml() : email.getHtml();
  }

  async saveEmail(format) {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);
    return format === 'mjml' ? email.saveMjml() : email.saveHtml();
  }

  async saveEmails() {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);
    return email.save();
  }

  getFeeds() {
    return Promise.all(this.config.feeds.map(async feedConfig => {
      const feed = new Feed(feedConfig);
      return await feed.resolve();
    }));
  }
}

module.exports = RssToEmail;

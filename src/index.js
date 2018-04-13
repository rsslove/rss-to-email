/**
 * Entrypoint for Javascript/Node applications
 */
const Config = require('./Config');
const Feed = require('./Feed');
const Email = require('./Email');

class RssToEmail {
  /**
   * Sets the configuration options
   * @param {(string|Object)} config
   */
  constructor(config) {
    this.config = new Config(config);
  }

  /**
   * Gets an email from a format string.
   * @param {string} format - valid options are 'html' or 'mjml'
   * @return {Promise<string>} - The email in your specified format
   */
  async getEmail(format) {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);

    return format === 'mjml' ? email.getMjml() : email.getHtml();
  }

  /**
   * Saves an email in the format specified
   * @param {string} format - valid options are 'html' or 'mjml'
   * @return {Promise<Email>}
   */
  async saveEmail(format) {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);

    return format === 'mjml' ? email.saveMjml() : email.saveHtml();
  }

  /**
   * Saves an email in both html and mjml formats.
   * @return {Promise<Email>}
   */
  async saveEmails() {
    // Create an array of feeds
    const feeds = await this.getFeeds();

    // Generate Email
    const email = new Email(this.config, feeds);

    return email.save();
  }

  /**
   * Get the an array of feed objects
   * @return {Promise<Object[]>}
   */
  getFeeds() {
    return Promise.all(this.config.feeds.map((feedConfig) => {
      const feed = new Feed(feedConfig);

      return feed.resolve();
    }));
  }
}

module.exports = RssToEmail;

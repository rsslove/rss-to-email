const stampit = require('stampit');
const Config = require('./Config');
const Feed = require('./Feed');
const Email = require('./Email');

/**
 * Capitalize the first letter in a string
 *
 * @param {string} str
 * @return {string}
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert an email format to a method name
 *
 * @param {string} format
 * @return {string}
 */
function emailFormatToMethodName(format) {
  return `get${capitalizeFirstLetter(format)}`;
}

const RssToEmail = stampit({
  props: {
    config: undefined,
    resolvedFeeds: undefined,
    email: undefined,
    defaultFormat: 'html',
  },
  /**
   * Initialize
   *
   * @param {object} options
   * @return {void}
   */
  init(options) {
    this.config = Config(options);
  },
  methods: {
    /**
     * Resolving feeds and set email object
     *
     * @return {Promise<RssToEmail>}
     */
    async generateEmail() {
      // Create an array of resolved feeds
      this.resolvedFeeds = await this.resolveFeeds(this.config.feeds);

      // Generate Email
      this.email = Email({ config: this.config, feeds: this.resolvedFeeds });

      return this;
    },

    /**
     * Generate (if necessary) and return the email string
     *
     * @param {string} format - 'html' and 'mjml' are supported
     * @return {Promise<string>}
     */
    async getEmail(format) {
      this.email || await this.generateEmail();
      const methodName = emailFormatToMethodName(format || this.defaultFormat);

      return this.email[methodName]();
    },

    /**
     * Resolve an array of feeds, returning a promise
     *
     * @param {[FeedConfig]} feeds
     * @return {Promise<[Feed]>}
     */
    resolveFeeds(feeds) {
      return Promise.all(feeds.map(this.resolveFeed));
    },

    /**
     * Resolve a single feed, returning a promise
     *
     * @param {FeedConfig} feedConfig
     * @return {Promise<Feed>}
     */
    resolveFeed(feedConfig) {
      return Feed({ feedConfig }).resolve();
    },
  },
});

module.exports = RssToEmail;

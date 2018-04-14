const Parser = require('rss-parser');
const stampit = require('stampit');

/**
 * Cleans an item
 * @param {Object} item
 * @return {Object}
 */
function cleanItem(item) {
  item.title = item.title.replace(/\bhttps?:\/\/\S+/gi, '');

  return item;
}

const Feed = stampit({
  props: {
    config: null,
    parser: null,
    items: null,
    url: null,
    title: null,
    description: null,
  },

  /**
   * Creates a new Feed from a feed configuration object
   * @param { Object } Feed configuration object
   * @return { void }
   */
  init({ feedConfig }) {
    this.config = feedConfig;
    this.parser = new Parser();
  },

  methods: {
    /**
     * Promises a feed with items embedded
     * @return { Promise<Feed> }
     */
    async resolve() {
      const feedObject = await this.parser.parseURL(this.config.url);

      this.items = feedObject.items.map(item => cleanItem(item));
      this.title = this.config.title || feedObject.title;
      this.description = this.config.description || feedObject.description;
      this.url = this.config.url || feedObject.feedUrl;

      return this;
    },
  },
});

module.exports = Feed;

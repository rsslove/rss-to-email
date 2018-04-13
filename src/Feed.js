const Parser = require('rss-parser');

/**
 * Cleans an item
 * @param {Object} item
 * @return {Object}
 */
function cleanItem(item) {
  const cleanedItem = item;

  // Remove url's from the title
  try {
    cleanedItem.title = item.title.replace(/\bhttps?:\/\/\S+/gi, '');
  } catch (e) {
    console.warn('Could not clean title for item');
  }

  return cleanedItem;
}

class Feed {
  /**
   * Creates a new Feed from a feed configuration object
   * @param {object} feedConfig
   */
  constructor(feedConfig) {
    this.feedConfig = feedConfig;
    this.parser = new Parser();
  }

  /**
   * Promises a feed with items embedded
   * @return {Promise<Object>}
   */
  async resolve() {
    const feedObject = await this.parser.parseURL(this.feedConfig.url);

    // Clean the feed object
    feedObject.items.map(item => cleanItem(item));

    // Set title and description
    feedObject.title = this.feedConfig.title || feedObject.title;
    feedObject.description = this.feedConfig.description || feedObject.title;

    return feedObject;
  }
}

module.exports = Feed;

const Parser = require('rss-parser');

function cleanItem(item) {
  const cleanedItem = item;

  try {
    cleanedItem.title = item.title.replace(/\bhttps?:\/\/\S+/gi, '');
  } catch (e) {
    console.warn('Could not clean title for item');
  }

  return cleanedItem;
}

class Feed {
  constructor(feedConfig) {
    this.feedConfig = feedConfig;
    this.parser = new Parser();
  }

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

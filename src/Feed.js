const Parser = require('rss-parser');

function cleanItem(item) {
  try {
    item.content = item.content.length < 5 ? item.content + '...' : item.content;
  } catch (e) {}

  try {
    item.title = item.title.replace(/\bhttps?:\/\/\S+/gi, "");
  } catch (e) {}

  return item;
}

class Feed {

  constructor(feedConfig) {
    this.feedConfig = feedConfig;
    this.parser = new Parser();
  }

  async resolve() {
    let feedObject = await this.parser.parseURL(this.feedConfig.url);

    // Clean the feed object
    feedObject.items.map(item => cleanItem(item));

    // Set title and description
    feedObject.title = this.feedConfig.title || feedObject.title;
    feedObject.description = this.feedConfig.description || feedObject.title;

    return feedObject;
  }
}

module.exports = Feed;

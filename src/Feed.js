const parser = new (require('rss-parser'))();

function cleanItem(item) {
  try {
    item.content = item.content.length < 5 ? '...' : item.content;
  } catch (e) {}

  try {
    item.title = item.title.replace(/\bhttps?:\/\/\S+/gi, "");
  } catch (e) {}

  return item;
}

class Feed {

  constructor(feedConfig) {
    this.feedConfig = feedConfig;
  }

  async resolve() {
    let feedObject = await parser.parseURL(this.feedConfig.url);

    // Clean the feed object
    feedObject.items.map(item => cleanItem(item));

    // Set title and description
    feedObject.title = this.feedConfig.title || feedObject.title;
    feedObject.description = this.feedConfig.description || feedObject.title;

    return feedObject;
  }
}

module.exports = Feed;

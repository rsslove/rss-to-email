const parser = new (require('rss-parser'))();

async function getFeedItems(url) {
  const feed = await parser.parseURL(url);

  return feed.items;
}

module.exports = getFeedItems;

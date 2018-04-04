const Feed = require('./Feed');
const parser = new (require('rss-parser'))();

describe('Feed', () => {
  let feed;
  let feedConfig;

  beforeEach(() => {
    feedConfig = {
      description: 'This is a description',
      title: 'This is a title',
      url: 'http://www.examplefeed.com/rss',
    };

    feed = new Feed(feedConfig);

    parser.parseURL = jest.fn();
  });

  test('creates feed from configuration', () => {
    expect(feed.feedConfig).toEqual(feedConfig);
  });

  test('resolves feed with valid url', async () => {
    const result = await feed.resolve();

    expect(result.description).toBe(feedConfig.description);
    expect(result.title).toBe(feedConfig.title);
  });
});

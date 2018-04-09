const Feed = require('../../src/Feed');
const Parser = require('rss-parser');

jest.mock('rss-parser');

describe('Feed', () => {
  let feed;
  let feedConfig;

  beforeEach(() => {
    Parser.mockClear();

    feedConfig = {
      description: 'This is a description',
      title: 'This is a title',
      url: 'http://www.examplefeed.com/rss',
    };
  });

  test('creates feed from configuration', () => {
    feed = new Feed(feedConfig);
    expect(feed.feedConfig).toEqual(feedConfig);
    expect(Parser).toHaveBeenCalledTimes(1);
  });

  test('resolves feed with valid url', async () => {
    const items = [{ title: 'test', content: 'test 2' }];

    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    feed = new Feed(feedConfig);

    const result = await feed.resolve();

    expect(result.description).toBe(feedConfig.description);
    expect(result.title).toBe(feedConfig.title);
    expect(result.items).toBe(items);
  });

  test('it removes urls from titles', async () => {
    const items = [{ title: 'test http://www.example.com/', content: 'test more content' }];

    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    feed = new Feed(feedConfig);

    const result = await feed.resolve();

    expect(result.items[0].title).toBe('test ');
  });
});

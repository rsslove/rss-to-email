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
    feed = Feed({feedConfig});

    expect(feed.config).toEqual(feedConfig);
    expect(Parser).toHaveBeenCalledTimes(1);
  });

  test('resolves feed with valid url', async () => {
    const items = [{ title: 'test', content: 'test 2' }];
    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    const result = await Feed({feedConfig}).resolve();

    expect(result.description).toEqual(feedConfig.description);
    expect(result.title).toEqual(feedConfig.title);
    expect(result.items).toEqual(items);
  });

  test('it removes urls from titles', async () => {
    const items = [{ title: 'test http://www.example.com/', content: 'test more content' }];
    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    const result = await Feed({feedConfig}).resolve();

    expect(result.items[0].title).toEqual('test ');
  });

  test('it filters by publishedSince if set', async () => {
    feedConfig.publishedSince = '2018-01-01';
    const items = [
      {
        title: 'This was published before the cutoff',
        content: 'test more content',
        isoDate: '2017-11-12T21:16:39.000Z',
      },
      {
        title: 'This was published after the cutoff',
        content: 'test more content',
        isoDate: '2018-02-02T21:16:39.000Z',
      },
    ];
    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    const result = await Feed({feedConfig}).resolve();

    expect(result.items[0].title).toEqual('This was published after the cutoff');
  });

  test('it does not filter by publishedSince if not set', async () => {
    feedConfig.publishedSince = undefined;
    const items = [
      {
        title: 'This was published before the cutoff',
        content: 'test more content',
        isoDate: '2017-11-12T21:16:39.000Z',
      },
      {
        title: 'This was published after the cutoff',
        content: 'test more content',
        isoDate: '2018-02-02T21:16:39.000Z',
      },
    ];
    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    const result = await Feed({feedConfig}).resolve();

    expect(result.items[1].title).toEqual('This was published after the cutoff');
    expect(result.items[0].title).toEqual('This was published before the cutoff');
  });

  test('it limits feed items when limit specified', async () => {
    feedConfig.limit = 3;
    const items = [
      { title: 'test http://www.example.com/', content: 'test more content' },
      { title: 'test http://www.example.com/', content: 'test more content' },
      { title: 'test http://www.example.com/', content: 'test more content' },
      { title: 'test http://www.example.com/', content: 'test more content' },
    ];
    Parser.mockImplementation(() => ({
      parseURL: () => ({ title: 'mock title', items }),
    }));

    const result = await Feed({feedConfig}).resolve();

    expect(result.items.length).toEqual(feedConfig.limit);
  });
});

const Config = require('./Config');

describe('Config', () => {
  let config;
  console.warn = jest.fn();

  beforeEach(() => {
    console.warn.mockClear();
  });

  test('creates config object, shows warning when no inputs given', () => {
    config = new Config();

    expect(console.warn).toHaveBeenCalled();
    expect(config.configObject.feedUrl).toBe('http://www.feedforall.com/sample.xml');
  });

  test('creates config object when filepath input given', () => {
    const input = './config.example.json';

    config = new Config(input);

    expect(config.configObject.feedUrl).toBe('http://www.feedforall.com/sample.xml');
  });

  test('creates config object when object input given', () => {
    const input = {
      "accentColor": "#2568ba",
      "feedUrl": "http://www.feedforall.com/sample-feed.xml",
      "header": {
        "link": "http://www.feedforall.com/",
        "title": "Test Example Input Header"
      },
    };

    config = new Config(input);

    expect(config.configObject.feedUrl).toBe('http://www.feedforall.com/sample-feed.xml');
  });
});

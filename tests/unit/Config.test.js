const Config = require('../../src/Config');

describe('Config', () => {
  let config;

  test('throws exception when no inputs given', () => {
    expect(() => Config()).toThrow();
  });

  test('creates config object when object input given', () => {
    const input = {
      accentColor: '#2568ba',
      header: {
        link: 'http://www.feedforall.com/',
        title: 'Test Example Input Header',
      },
      feeds: [
        {
          description: 'A test feed description',
          title: 'A test feed title',
          url: 'http://www.feedforall.com/test.xml',
        }
      ]
    };

    config = Config(input);

    expect(config.accentColor).toEqual(input.accentColor);
    expect(config.header).toEqual(input.header);
    expect(config.feeds).toEqual(input.feeds);
  });

  test('creates config object with default header and feeds when fields not given', () => {
    const input = {accentColor: '#2568ba'};

    config = Config(input);

    expect(config.accentColor).toEqual(input.accentColor);
    expect(config.header).toBeDefined();
    expect(config.feeds).toBeDefined();
  });
});

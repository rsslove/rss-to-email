const Config = require('../../src/Config');

describe('Config', () => {
  let config;

  test('throws exception when no inputs given', () => {
    expect(() => Config()).toThrow('No configuration object included.');
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
    expect(config.outro).toEqual("Thanks for reading. We'll be back next week with more!<br/><br/>John Smith, CMO at Example Co.");
  });

  test('config does not replace empty strings', () => {
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
      ],
      outro: '',
    };

    config = Config(input);

    expect(config.outro).toEqual(input.outro);
  });

  test('creates config object with default header and feeds when fields not given', () => {
    const input = {accentColor: '#2568ba'};

    config = Config(input);

    expect(config.accentColor).toEqual(input.accentColor);
    expect(config.header).toBeDefined();
    expect(config.feeds).toBeDefined();
  });
});

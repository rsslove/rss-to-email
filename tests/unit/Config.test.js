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
    };

    config = new Config(input);

    expect(config.accentColor).toEqual(input.accentColor);
    expect(config.header).toEqual(input.header);
  });
});

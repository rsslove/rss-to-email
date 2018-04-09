const Config = require('../../src/Config');
const fs = require('fs');

describe('Config', () => {
  let config;
  let expectedConfig;
  console.warn = jest.fn();

  beforeEach(() => {
    console.warn.mockClear();
    expectedConfig = Config.getDefault();
  });

  test('creates config object, shows warning when no inputs given', () => {
    config = new Config();

    expect(console.warn).toHaveBeenCalled();
    expect(config).toEqual(expectedConfig);
  });

  test('creates config object when filepath input given', () => {
    const input = './fixtures/config.test.json';
    const inputObject = JSON.parse(fs.readFileSync(input));

    config = new Config(input);

    expect(config).toEqual(Object.assign(expectedConfig, inputObject));
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

    expect(config).toEqual(Object.assign(expectedConfig, input));
  });

  test('creates config object using setConfigFromFile method', () => {
    const input = './config.example.json';

    config = Config.getFromFile(input);

    expect(config).toEqual(expectedConfig);
  });
});

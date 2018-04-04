const Config = require('./Config');
const fs = require('fs');

describe('Config', () => {
  let config;
  let expectedConfig;
  console.warn = jest.fn();

  beforeEach(() => {
    console.warn.mockClear();
    expectedConfig = {
      "accentColor": "red",
      "feeds": [
        {
          "description": "A short custom feed description",
          "title": "A custom feed title",
          "url": "http://www.feedforall.com/sample.xml"
        },
        {
          "description": "A short custom feed description",
          "title": "A custom feed title",
          "url": "http://www.feedforall.com/sample.xml"
        }
      ],
      "greeting": "Hey there,",
      "header": {
        "banner": "http://www.example.com/image.png",
        "link": "http://www.example.com/",
        "title": "Example Header"
      },
      "intro": "Thanks for opening the email! Here are some links I want you to check out:",
      "output": {
        "filename": "example",
        "formats": [
          "html",
          "mjml"
        ]
      },
      "outro": "Thanks for reading. We'll be back next week with more!",
      "signature": "John Smith, CMO at Example Co."
    };
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
      "accentColor": "#2568ba",
      "header": {
        "link": "http://www.feedforall.com/",
        "title": "Test Example Input Header"
      }
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

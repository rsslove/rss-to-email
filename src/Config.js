const fe = require('file-exists');
const fs = require('fs');
const isJson = require('is-valid-json');

const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration file or object included. Defaults will be used.';
const DEFAULT_CONFIG = {
  "accentColor": "red",
  "filename": "example",
  "header": {
    "banner": "http://www.example.com/image.png",
    "link": "http://www.example.com/",
    "title": "Example Header"
  },
  "greeting": "Hey there,",
  "intro": "Thanks for opening the email! Here are some links I want you to check out:",
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
  "outro": "Thanks for reading. We'll be back next week with more!",
  "signature": "John Smith, CMO at Example Co."
};

function isFilepathString(input) {
  return typeof input === 'string' && fs !== undefined && fe.sync(input);
}

function isJsonString(input) {
  return typeof input === 'string' && isJson(input);
}

function isConfigObject(input) {
  return typeof input === 'object';
}

function merge(config1, config2) {
  return Object.assign(config1, config2);
}

class Config {
  constructor(input) {
    let config;

    if (isFilepathString(input)) {
      config = Config.getFromFile(input);
    } else if (isJsonString(input)) {
      config = Config.getFromJson(input);
    } else if (isConfigObject(input)) {
      config = Config.getFromObject(input);
    } else {
      console.warn(DEFAULT_CONFIG_WARNING_MESSAGE);
      config = Config.getDefault();
    }

    return config;
  }

  static getDefault() {
    return DEFAULT_CONFIG;
  }

  static getFromJson(input) {
    return merge(Config.getDefault(), Config.getFromObject(JSON.parse(input)));
  }

  static getFromFile(input) {
    return merge(Config.getDefault(), JSON.parse(fs.readFileSync(input)));
  }

  static getFromObject(input) {
    return merge(Config.getDefault(), input);
  }
}

module.exports = Config;

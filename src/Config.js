const fe = require('file-exists');
const fs = require('fs');
const isJson = require('is-valid-json');
const path = require('path');

const DEFAULT_CONFIG_FILEPATH = path.join(__dirname, '..', 'config.example.json');
const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration file or object included. Defaults will be used.';

function isFilepathString(input) {
  return typeof input === 'string' && fe.sync(input);
}

function isJsonString(input) {
  return typeof input === 'string' && isJson(input);
}

function isConfigObject(input) {
  return typeof input === 'object' && input.feedUrl;
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
    return JSON.parse(fs.readFileSync(DEFAULT_CONFIG_FILEPATH));
  }

  static getFromJson(input) {
    return merge(Config.getDefault(), Config.getFromObject(JSON.parse(input)));
  };

  static getFromFile(input) {
    return merge(Config.getDefault(), JSON.parse(fs.readFileSync(input)));
  };

  static getFromObject(input) {
    return merge(Config.getDefault(), Object.assign(input));
  };
}

module.exports = Config;

const fe = require('file-exists');
const fs = require('fs');
const isJson = require('is-valid-json');
const path = require('path');
const DEFAULT_CONFIG_FILEPATH = path.join(__dirname, '..', 'config.example.json');

function isFilepathString(input) {
  return typeof input === 'string' && fe.sync(input);
}

function isJsonString(input) {
  return typeof input === 'string' && isJson(input);
}

function isConfigObject(input) {
  return typeof input === 'object' && input.feedUrl;
}

const Config = function (input) {
  this.configObject = {};

  this.setConfiguration = function (input) {
    if (isFilepathString(input)) {
      this.setConfigFromFile(input);
    } else if (isJsonString(input)) {
      this.setConfigFromObject(JSON.parse(input));
    } else if (isConfigObject(input)) {
      this.setConfigFromObject(input);
    } else {
      // Show warning and use defaults
      console.warn('No configuration file or object included. Defaults will be used.');
      this.setConfigFromFile(DEFAULT_CONFIG_FILEPATH);
    }
  };

  this.setConfigFromFile = function (input) {
    this.configObject = JSON.parse(fs.readFileSync(input));
  };

  this.setConfigFromObject = function (input) {
    this.configObject = Object.assign(input);
  };

  this.getConfiguration = function () {
    return this.configObject;
  };

  this.setConfiguration(input);
};

module.exports = Config;

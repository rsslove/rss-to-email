const fe = require('file-exists');
const fs = require('fs');
const isJson = require('is-valid-json');

const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration file or object included. Defaults will be used.';
const DEFAULT_CONFIG = {
  accentColor: 'red',
  filename: 'example',
  header: {
    banner: 'http://www.example.com/image.png',
    link: 'http://www.example.com/',
    title: 'Example Header',
  },
  greeting: 'Hey there,',
  intro: 'Thanks for opening the email! Here are some links I want you to check out:',
  feeds: [
    {
      description: 'A short custom feed description',
      title: 'A custom feed title',
      url: 'http://www.feedforall.com/sample.xml',
    },
    {
      description: 'A short custom feed description',
      title: 'A custom feed title',
      url: 'http://www.feedforall.com/sample.xml',
    },
  ],
  outro: "Thanks for reading. We'll be back next week with more!",
  signature: 'John Smith, CMO at Example Co.',
};

/**
 * Determines whether an input is a filepath or not
 * @param {(string|Object)} input
 * @returns {boolean}
 */
function isFilepathString(input) {
  return typeof input === 'string' && fe.sync(input);
}

/**
 * Determines whether an input string is a JSON object or not
 * @param {(string|Object)} input
 * @returns {boolean}
 */
function isJsonString(input) {
  return typeof input === 'string' && isJson(input);
}

/**
 * Determines whether an input is a configuration object or not
 * @param {(string|Object)} input
 * @returns {boolean}
 */
function isConfigObject(input) {
  return typeof input === 'object';
}

/**
 * Merge two configuration objects
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object}
 */
function merge(config1, config2) {
  return Object.assign(config1, config2);
}

class Config {
  /**
   * Instantiates a new config object based on a string or object input
   * @param  {(string|Object)} input
   * @returns {Object}
   */
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

  /**
   * Get the default config object
   * @returns {Object}
   */
  static getDefault() {
    return DEFAULT_CONFIG;
  }

  /**
   * Generate a config object from a json string
   * @param {string} input
   * @returns {Object}
   */
  static getFromJson(input) {
    return merge(Config.getDefault(), Config.getFromObject(JSON.parse(input)));
  }

  /**
   * Generate a config object from a filepath
   * @param {string} input
   * @returns {Object}
   */
  static getFromFile(input) {
    return merge(Config.getDefault(), JSON.parse(fs.readFileSync(input)));
  }

  /**
   * Generate a config object from an object
   * @param {Object} input
   * @returns {Object}
   */
  static getFromObject(input) {
    return merge(Config.getDefault(), input);
  }
}

module.exports = Config;

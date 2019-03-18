const stampit = require('stampit');

const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration object included.';
const DEFAULT_TEMPLATE_URL = 'https://raw.githubusercontent.com/portable-cto/rss-to-email/master/src/templates/default.mjml';

const HeaderConfig = stampit({
  props: {
    banner: undefined,
    link: undefined,
    title: undefined,
  },
  /**
   * Initialize
   * @param {object} options
   * @return {void}
   */
  init(options) {
    this.banner = options.banner;
    this.link = options.link;
    this.title = options.title;
  },
});

const FeedConfig = stampit({
  props: {
    description: undefined,
    title: undefined,
    url: undefined,
  },
  /**
   * Initialize
   * @param {object} options
   * @return {void}
   */
  init(options) {
    this.description = options.description;
    this.title = options.title;
    this.url = options.url;
  },
});

const DEFAULT_CONFIG_OBJECT = {
  accentColor: 'red',
  filename: 'example',
  header: HeaderConfig({
    description: 'A short custom feed description',
    title: 'A custom feed title',
    url: 'http://www.feedforall.com/sample.xml',
  }),
  intro: 'Hey there,<br/><br/>Thanks for opening the email! Here are some links I want you to check out:',
  feeds: [FeedConfig({
    publishedSince: undefined,
    description: 'A short custom feed description',
    title: 'A custom feed title',
    url: 'http://www.feedforall.com/sample.xml',
  })],
  outro: "Thanks for reading. We'll be back next week with more!<br/><br/>John Smith, CMO at Example Co.",
  templateUrl: DEFAULT_TEMPLATE_URL,
};

/**
 * Determine whether or not a value is null or undefined
 * @param {any} val
 * @return {boolean}
 */
function isNullOrUndefined(val) {
  return val === undefined || val === null;
}

const Config = stampit({
  props: DEFAULT_CONFIG_OBJECT,
  /**
   * Initialize
   * @param {object} options
   * @return {void}
   */
  init(options) {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
      throw DEFAULT_CONFIG_WARNING_MESSAGE;
    }

    Object.keys(this).forEach((property) => {
      this[property] = !isNullOrUndefined(options[property])
        ? options[property]
        : DEFAULT_CONFIG_OBJECT[property];
    });
  },
});

module.exports = Config;

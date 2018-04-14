const stampit = require('stampit');

const DEFAULT_CONFIG_WARNING_MESSAGE = 'No configuration file or object included. Defaults will be used.';

const HeaderConfig = stampit({
  props: {
    banner: undefined,
    link: undefined,
    title: undefined,
  },
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
  greeting: 'Hey there,',
  intro: 'Thanks for opening the email! Here are some links I want you to check out:',
  feeds: [FeedConfig({
    description: 'A short custom feed description',
    title: 'A custom feed title',
    url: 'http://www.feedforall.com/sample.xml',
  })],
  outro: "Thanks for reading. We'll be back next week with more!",
  signature: 'John Smith, CMO at Example Co.',
};

const Config = stampit({
  props: DEFAULT_CONFIG_OBJECT,
  init(options) {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
      throw DEFAULT_CONFIG_WARNING_MESSAGE;
    }

    Object.keys(this).forEach((property) => {
      this[property] = options[property] || DEFAULT_CONFIG_OBJECT[property];
    });
  },
  methods: {
  }
});

module.exports = Config;

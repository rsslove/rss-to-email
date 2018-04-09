const Email = require('../../src/Email');

describe('Email', () => {
  let email;
  let config;
  let feeds;

  beforeEach(() => {
    config = {};
    feeds = [{}];
    email = new Email(config, feeds);
  });

  test('creates email from config and feeds', () => {
    expect(email.config).toEqual(config);
    expect(email.feeds).toEqual(feeds);
  });
});

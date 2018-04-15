const RssToEmail = require('../../src/RssToEmail');

let config;
let subject;

describe('RssToEmail - Integration', () => {

  beforeEach(() => {
    config = {
      accentColor: 'blue',
      feeds: [
        {
          description: 'A test feed description',
          title: 'A test feed title',
          url: 'http://www.feedforall.com/sample.xml',
        }
      ]
    };
    subject = RssToEmail(config);
  });

  test('can generate email when feeds resolve', async () => {
    const result = await subject.generateEmail();

    expect(result.email).toBeDefined();
    expect(result.email.config.accentColor).toEqual(config.accentColor);
    expect(result.email.config.feeds).toEqual(config.feeds);
  });

  test('can get mjml email when email already set', async () => {
    const email = {
      getMjml: function () {
        return '<mjml></mjml>'
      }
    };
    subject.email = email;

    const result = await subject.getEmail('mjml');

    expect(result).toEqual(email.getMjml());
  });

  test('can get html email when email already set', async () => {
    const email = {
      getHtml: function () {
        return '<html></html>'
      }
    };
    subject.email = email;

    const result = await subject.getEmail('html');

    expect(result).toEqual(email.getHtml());
  });

  test('can get email in default format when email set', async () => {
    const email = {
      getHtml: function () {
        return '<html></html>'
      }
    };
    subject.email = email;

    const result = await subject.getEmail();

    expect(result).toEqual(email.getHtml());
  });

  test('can generate and get email in default format when email not yet set', async () => {
    const result = await subject.getEmail('html');

    expect(result).toBeDefined();
  });
});
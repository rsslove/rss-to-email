const RssToEmail = require('../../src/RssToEmail');

let config;
let subject;

describe('RssToEmail - Integration', () => {

  beforeEach(() => {
    config = {
      accentColor: 'blue',
      // other things
    };
    subject = RssToEmail(config);
  });

  test('can generate email when feeds resolve', async () => {
    //
  });

  test('can get mjml email when email already set', async () => {
    //
  });

  test('can get html email when email already set', async () => {
    //
  });

  test('can get email in default format when email set', async () => {
    //
  });

  test('can generate and get email in default format when email not yet set', async () => {
    //
  });
});
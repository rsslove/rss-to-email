const Email = require('../../src/Email');
const mjmlLib = require('mjml');
const fetch = require('node-fetch');
const handlebars = require('handlebars');
jest.mock('mjml');
jest.mock('node-fetch');
jest.mock('handlebars');

describe('Email', () => {
  let email;
  let config;
  let feeds;

  beforeEach(() => {
    mjmlLib.mockClear();
    fetch.mockClear();

    config = {templateUrl: 'http://www.example.com'};
    feeds = [{items: [{title: 'test title'}]}];
    email = new Email({config, feeds});
  });

  test('creates Email object from config and feeds', () => {
    expect(email.config).toEqual(config);
    expect(email.feeds).toEqual(feeds);
  });

  test('get mjml when mjml content is set', async() => {
    email.mjmlContent = '<mjml></mjml>';

    const result = await email.getMjml();

    expect(result).toEqual('<mjml></mjml>');
  });

  test('get mjml when mjml content is not set', async() => {
    const mjmlContent = '<mjml></mjml>';
    fetch.mockImplementation(() => Promise.resolve({text: () => Promise.resolve(mjmlContent)}));
    handlebars.compile.mockImplementation(() => () => mjmlContent);

    const result = await email.getMjml();

    expect(fetch).toHaveBeenCalledWith(config.templateUrl);
    expect(result).toContain('<mjml>');
    expect(result).toContain('</mjml>');
  });

  test('get html when mjml content is set', async() => {
    const html = '<!doctype html>';
    const mjmlContent = '<mjml></mjml>';
    email.mjmlContent = mjmlContent;
    mjmlLib.mockImplementation(() => ({html}));

    const result = await email.getHtml();

    expect(result).toEqual(html);
    expect(mjmlLib).toHaveBeenCalledWith(mjmlContent);
  });
});

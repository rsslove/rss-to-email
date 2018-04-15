const Email = require('../../src/Email');
const head = require('../../src/templates/head');
const header = require('../../src/templates/header');
const intro = require('../../src/templates/intro');
const entry = require('../../src/templates/entry');
const entryDivider = require('../../src/templates/entry-divider');
const outro = require('../../src/templates/outro');
const foot = require('../../src/templates/foot');
const mjmlLib = require('mjml');
jest.mock('../../src/templates/head');
jest.mock('../../src/templates/header');
jest.mock('../../src/templates/intro');
jest.mock('../../src/templates/entry');
jest.mock('../../src/templates/entry-divider');
jest.mock('../../src/templates/outro');
jest.mock('../../src/templates/foot');
jest.mock('mjml');

describe('Email', () => {
  let email;
  let config;
  let feeds;

  beforeEach(() => {
    head.mockClear();
    header.mockClear();
    intro.mockClear();
    entry.mockClear();
    entryDivider.mockClear();
    outro.mockClear();
    foot.mockClear();
    mjmlLib.mockClear();

    config = {};
    feeds = [{items: [{title: 'test title'}]}];
    email = new Email({config, feeds});
  });

  test('creates Email object from config and feeds', () => {
    expect(email.config).toEqual(config);
    expect(email.feeds).toEqual(feeds);
  });

  test('get mjml when mjml content is set', () => {
    email.mjmlContent = '<mjml></mjml>';

    const result = email.getMjml();

    expect(result).toEqual('<mjml></mjml>');
  });

  test('get mjml when mjml content is not set', () => {
    head.mockImplementation(() => '<mjml>');
    header.mockImplementation(() => '');
    intro.mockImplementation(() => '');
    entry.mockImplementation(() => '');
    entryDivider.mockImplementation(() => '');
    outro.mockImplementation(() => '');
    foot.mockImplementation(() => '</mjml>');

    const result = email.getMjml();

    expect(result).toContain('<mjml>');
    expect(result).toContain('</mjml>');
    expect(head).toHaveBeenCalledWith(config);
    expect(header).toHaveBeenCalledWith(config);
    expect(intro).toHaveBeenCalledWith(config);
    expect(entry).toHaveBeenCalledTimes(feeds[0].items.length);
    expect(entryDivider).toHaveBeenCalledTimes(feeds[0].items.length);
    expect(outro).toHaveBeenCalledWith(config);
    expect(foot).toHaveBeenCalledWith(config);
  });

  test('get html when mjml content is set', () => {
    const html = '<!doctype html>';
    const mjmlContent = '<mjml></mjml>';
    email.mjmlContent = mjmlContent;
    mjmlLib.mockImplementation(() => ({html}));

    const result = email.getHtml();

    expect(result).toEqual(html);
    expect(mjmlLib).toHaveBeenCalledWith(mjmlContent);
  });
});

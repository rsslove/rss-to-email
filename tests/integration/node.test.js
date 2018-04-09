const fe = require('file-exists');
const fs = require('fs');
const path = require('path');
const RssToEmail = require('../../index');

function outputFilePath(filename) {
  return path.join(__dirname, '..', '..', 'output', filename);
}

function outputFileExists(filename) {
  return fe.sync(outputFilePath(filename));
}

let subject;

describe('Node - Integration', () => {

  beforeEach(() => {
    try {
      fs.unlinkSync(outputFilePath('example.html'));
      fs.unlinkSync(outputFilePath('example.mjml'));
    } catch (e) {
      // Do Nothing
    }

    subject = new RssToEmail({});
  });

  test('generate mjml email from config', async () => {

    const result = await subject.getEmail('mjml');

    expect(result.length).toBeGreaterThan(10);
    expect(result).toContain('<mjml>');
  });

  test('generate html email from config', async () => {

    const result = await subject.getEmail('html');

    expect(result.length).toBeGreaterThan(10);
    expect(result).toContain('<!doctype html><html');
  });

  test('save emails', async () => {

    const result = await subject.saveEmails();

    expect(outputFileExists('example.html')).toBeTruthy();
    expect(outputFileExists('example.mjml')).toBeTruthy();
    expect(result).toBeUndefined();
  });
});
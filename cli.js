#!/usr/bin/env node
const RssToEmail = require('./src/RssToEmail');
const fs = require('fs');

/**
 * Run the RSS to Email script
 * @param config
 * @return {Promise<object>}
 */
async function init(config) {
  const rssToEmail = RssToEmail(config);

  // Get files
  const html = await rssToEmail.getEmail();
  const mjml = await rssToEmail.getEmail('mjml');

  return {html, mjml};
}

const [,, ...args] = process.argv;

if (args[0] && args[1]) {
  console.log(`Using config file '${args[0]}'`);

  // Get config object from file path
  const config = JSON.parse(fs.readFileSync(args[0], 'utf8'));

  // Run the script
  init(config).then((results) => {
    fs.writeFileSync(`${args[1]}/${config.filename}.html`, results.html);
    fs.writeFileSync(`${args[1]}/${config.filename}.mjml`, results.mjml);

    console.log('Process complete');
  });
} else {
  console.error('Error: config file and output directory should be specified.');
}

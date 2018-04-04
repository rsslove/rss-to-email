const initializeTemplate = require('../templates/initialize-template');
const header = require('../templates/header');
const intro = require('../templates/intro');
const entryTemplate = require('../templates/entry');
const outro = require('../templates/outro');
const closeTemplate = require('../templates/close-template');
const cleanItem = require('./clean-item');

function generateMjmlFromItems(items, config) {
  // Initialize with head
  let mjml = initializeTemplate(config);

  // Add header
  mjml += header(config);

  // Add intro
  mjml += intro(config);

  // Add items
  if (items) {
    items.forEach(item => mjml += entryTemplate(cleanItem(item)));
  }

  // Add outro
  mjml += outro(config);

  // Close template
  mjml += closeTemplate(config);

  return mjml;
}

module.exports = generateMjmlFromItems;

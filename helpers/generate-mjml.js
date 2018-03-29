const initializeTemplate = require('../templates/initialize-template');
const header = require('../templates/header');
const intro = require('../templates/intro');
const entryTemplate = require('../templates/entry');
const outro = require('../templates/outro');
const closeTemplate = require('../templates/close-template');
const cleanItem = require('./clean-item');

function generateMjmlFromItems(items, config) {
  // Initialize with head
  let html = initializeTemplate(config);

  // Add header
  html += header(config);

  // Add intro
  html += intro(config);

  // Add items
  if (items) {
    items.forEach(item => html += entryTemplate(cleanItem(item)));
  }

  // Add outro
  html += outro(config);

  // Close template
  html += closeTemplate(config);

  return html;
}

module.exports = generateMjmlFromItems;

const head = require('./templates/head');
const header = require('./templates/header');
const intro = require('./templates/intro');
const entryTemplate = require('./templates/entry');
const outro = require('./templates/outro');
const foot = require('./templates/foot');
const mjmlLib = require('mjml');
const fs = require('fs');
const path = require('path');

const OUTPUT_FOLDER_PATH = path.join(__dirname, '..', 'output/');

class Email {

  constructor(config, feeds) {
    this.config = config;
    this.feeds = feeds || [];
    this.mjmlContent = undefined;
  }

  generate() {
    // Initialize the template
    this.mjmlContent = head(this.config);

    // Add header
    this.mjmlContent += header(this.config);

    // Add intro
    this.mjmlContent += intro(this.config);

    // Add each feed's item to the email
    this.feeds.forEach(feed => {
      feed.items.forEach(item => this.mjmlContent += entryTemplate(item));
    });

    // Add outro
    this.mjmlContent += outro(this.config);

    // Close template
    this.mjmlContent += foot(this.config);

    return this;
  }

  save() {
    this.mjmlContent || this.generate();
    this.saveMjml();
    this.saveHtml();
  }

  saveMjml() {
    this.mjmlContent || this.generate();
    const filePath = OUTPUT_FOLDER_PATH + this.config.filename + '.mjml';

    fs.writeFileSync(filePath, this.getMjml());

    return this;
  }

  saveHtml() {
    this.mjmlContent || this.generate();
    const filePath = OUTPUT_FOLDER_PATH + this.config.filename + '.html';

    fs.writeFileSync(filePath, this.getHtml());

    return this;
  }

  getMjml() {
    this.mjmlContent || this.generate();

    return this.mjmlContent;
  }

  getHtml() {
    this.mjmlContent || this.generate();

    return mjmlLib.mjml2html(this.getMjml()).html;
  }
}

module.exports = Email;

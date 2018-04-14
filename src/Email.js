const head = require('./templates/head');
const header = require('./templates/header');
const intro = require('./templates/intro');
const entry = require('./templates/entry');
const entryDivider = require('./templates/entry-divider');
const outro = require('./templates/outro');
const foot = require('./templates/foot');
const mjmlLib = require('mjml');
const fs = require('fs');
const path = require('path');
const stampit = require('stampit');

const OUTPUT_FOLDER_PATH = path.join(__dirname, '..', 'output/');

const Email = stampit({
  props: {
    config: undefined,
    feeds: undefined,
    mjmlContent: undefined,
  },

  /**
   * Instantiate a new email object
   * @param {{object, array}} config, feeds
   * @return {void}
   */
  init({ config, feeds }) {
    this.config = config;
    this.feeds = feeds;
  },

  methods: {
    /**
     * Generate mjmlContent from the config and feeds set in the constructor
     * @returns {Email}
     */
    generate() {
      // Initialize the template
      this.mjmlContent = head(this.config);

      // Add header
      this.mjmlContent += header(this.config);

      // Add intro
      this.mjmlContent += intro(this.config);

      // Add each feed's item to the email
      this.feeds.forEach((feed) => {
        this.mjmlContent += entryDivider(feed);
        feed.items.forEach((item) => {
          this.mjmlContent += entry(item);
        });
      });

      // Add outro
      this.mjmlContent += outro(this.config);

      // Close template
      this.mjmlContent += foot(this.config);

      return this;
    },

    /**
     * Saves an HTML and MJML email from the content or generates it first.
     * @return {Email}
     */
    save() {
      this.mjmlContent || this.generate();
      this.saveMjml();
      this.saveHtml();

      return this;
    },

    /**
     * Saves the MJML email to the output directory.
     * @return {Email}
     */
    saveMjml() {
      this.mjmlContent || this.generate();
      const filePath = `${OUTPUT_FOLDER_PATH + this.config.filename}.mjml`;

      fs.writeFileSync(filePath, this.getMjml());

      return this;
    },

    /**
     * Saves the HTML email to the output directory.
     * @return {Email}
     */
    saveHtml() {
      this.mjmlContent || this.generate();
      const filePath = `${OUTPUT_FOLDER_PATH + this.config.filename}.html`;

      fs.writeFileSync(filePath, this.getHtml());

      return this;
    },

    /**
     * Get the MJML email as a string.
     * @return {string}
     */
    getMjml() {
      this.mjmlContent || this.generate();

      return this.mjmlContent;
    },

    /**
     * Get the HTML email as a string.
     * @return {string}
     */
    getHtml() {
      return mjmlLib(this.getMjml()).html;
    },
  },
});

module.exports = Email;

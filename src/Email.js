const head = require('./templates/head');
const header = require('./templates/header');
const intro = require('./templates/intro');
const entry = require('./templates/entry');
const entryDivider = require('./templates/entry-divider');
const outro = require('./templates/outro');
const foot = require('./templates/foot');
const mjmlLib = require('mjml');
const stampit = require('stampit');

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

    get(format) {
      return this[`get${capitalizeFirstLetter(format)}`]();
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

class Email {

  constructor(config, feeds, format) {
    this.config = config;
    this.feeds = feeds || [];
    this.format = format || 'html';
  }

  /**
   * Generate the email in the specified format
   */
  generate(format) {
    format = format || this.format;
    return true;
  }

  /**
   * Save the email to a filepath
   */
  save(path) {

  }

  generateHtml() {

  }

  generateMjml() {

  }
}

module.exports = Email;

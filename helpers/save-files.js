const fs = require('fs');
const mjmlLib = require('mjml');

function saveHtml(mjml, config) {
  const htmlFilePath = './output/' + config.output.filename + '.html';

  const html = mjmlLib.mjml2html(mjml).html;
  fs.writeFileSync(htmlFilePath, html);
}

function saveMjml(mjml, config) {
  const mjmlFilePath = './output/' + config.output.filename + '.mjml';

  fs.writeFileSync(mjmlFilePath, mjml);
}

function saveFiles(mjml, config) {
  if (config.output.types && config.output.types.includes('mjml')) {
    saveMjml(mjml, config);
  }

  if (config.output.types && config.output.types.includes('html')) {
    saveHtml(mjml, config);
  }
}

module.exports = saveFiles;

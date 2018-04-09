const compile = require('string-template/compile');

const template = compile(`
    </mj-container>
  </mj-body>
</mjml>`);

module.exports = template;

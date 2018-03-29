const compile = require("string-template/compile");
const template = compile(`
      <!-- Intro -->
      <mj-section>
        <mj-column>
          <mj-text padding-top="20">{greeting}</mj-text>
          <mj-text padding-bottom="20">{intro}</mj-text>
        </mj-column>
      </mj-section>
`);

module.exports = template;

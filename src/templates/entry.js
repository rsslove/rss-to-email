const compile = require("string-template/compile");
const template = compile(`
      <!-- Entry -->
      <mj-section>
        <mj-column>
          <mj-link href="{link}">{title}</mj-link>
          <mj-text>{content}</mj-text>
          <mj-divider></mj-divider>
        </mj-column>
      </mj-section>
`);

module.exports = template;

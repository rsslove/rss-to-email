const compile = require('string-template/compile');

const template = compile(`
      <!-- Entry -->
      <mj-section>
        <mj-column>
          <mj-text><a href="{link}">{title}</a></mj-text>
          <mj-text>{content}</mj-text>
          <mj-divider></mj-divider>
        </mj-column>
      </mj-section>
`);

module.exports = template;

const compile = require('string-template/compile');

const template = compile(`
      <!-- Outro -->
      <mj-section>
        <mj-column>
          <mj-text>{outro}</mj-text>
          <mj-text padding-bottom="20">{signature}</mj-text>
        </mj-column>
      </mj-section>
`);

module.exports = template;

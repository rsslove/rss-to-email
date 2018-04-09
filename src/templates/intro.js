const compile = require('string-template/compile');

const template = (config) => {
  const greetingText = config.greeting ? '<mj-text padding-top="20">{greeting}</mj-text>' : '';
  const introText = config.intro ? '<mj-text padding-bottom="20">{intro}</mj-text>' : '';
  return compile(`
      <!-- Intro -->
      <mj-section>
        <mj-column>
          ${greetingText}
          ${introText}
        </mj-column>
      </mj-section>
  `)(config);
};

module.exports = template;

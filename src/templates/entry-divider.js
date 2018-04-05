const compile = require('string-template/compile');

const template = (config) => {
  const title = config.title ? '<mj-text font-size="24px" padding-top="20">{title}</mj-text>' : '';
  const description = config.description ? '<mj-text padding-bottom="20">{description}</mj-text>' : '';
  return compile(`
      <!-- Feed Divider -->
      <mj-section>
        <mj-column>
          ${title}
          ${description}
        </mj-column>
      </mj-section>
  `)(config);
};

module.exports = template;

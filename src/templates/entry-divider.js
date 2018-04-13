const compile = require('string-template/compile');

const template = (config) => {
  const title = config.title ? '<mj-text font-size="24px" padding-top="20px">{title}</mj-text>' : '';
  const description = config.description ? '<mj-text padding-bottom="20px">{description}</mj-text>' : '';

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

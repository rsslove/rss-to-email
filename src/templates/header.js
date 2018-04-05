const compile = require('string-template/compile');

const withBanner = `
      <!-- Header -->
      <mj-section>
        <mj-column>
          <mj-image href="{link}" align="center" src="{banner}" alt="{title}"></mj-image>
        </mj-column>
      </mj-section>
`;

const withoutBanner = `
      <!-- Header -->
      <mj-section>
        <mj-column>
          <mj-link href="{link}" color="{accentColor}" padding="30 0 40" align="center" font-size="24px">{title}</mj-link>
        </mj-column>
      </mj-section>
`;

const template = (config) => {
  const headerConfig = config.header;
  const compileFunction = headerConfig.banner ? compile(withBanner) : compile(withoutBanner);
  headerConfig.accent_color = config.accent_color;

  return compileFunction(headerConfig);
};

module.exports = template;

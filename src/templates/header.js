const compile = require('string-template/compile');

const template = (config) => {
  const headerConfig = config.header;
  headerConfig.accent_color = config.accent_color;

  const headerContent = headerConfig.banner ?
    '<mj-image href="{link}" align="center" src="{banner}" alt="{title}"></mj-image>' :
    '<mj-link href="{link}" color="{accentColor}" padding="30 0 40" align="center" font-size="24px">{title}</mj-link>';

  return compile(`
      <!-- Header -->
      <mj-section>
        <mj-column>
          ${headerContent}
        </mj-column>
      </mj-section>
  `)(headerConfig);
};

module.exports = template;

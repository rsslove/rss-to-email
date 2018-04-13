const compile = require('string-template/compile');

const template = (config) => {
  const headerConfig = config.header;
  headerConfig.accent_color = config.accent_color;

  const headerContent = headerConfig.banner ?
    '<mj-image href="{link}" align="center" src="{banner}" alt="{title}"></mj-image>' :
    '<mj-text color="{accentColor}" padding="30px 0 40px" align="center" font-size="24px"><a href="{link}">{title}</a></mj-text>';

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

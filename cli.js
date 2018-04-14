const { RssToEmail }= require('./src/RssToEmail');

async function init() {
  const rssToEmail = RssToEmail({
    accentColor: 'red',
  });

  const html = await rssToEmail.getEmail();
  const mjml = await rssToEmail.getEmail('mjml');

  console.log('Process complete');
  console.log(mjml);
}

init();

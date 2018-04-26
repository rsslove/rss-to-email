const RssToEmail = require('rss-to-email');
const app = (require('express'))();
const Webtask = require('webtask-tools');

app.use(require('body-parser').json());

app.post('/', (req, res) => {
  const config = req.body || {};
  const rssToEmail = RssToEmail(config);
  rssToEmail.getEmail(config.format || 'html')
  .then(email => {
    res.writeHead(200, {
      'Content-Type': 'text/html ',
    });
    res.end(email);
  });
});

module.exports = Webtask.fromExpress(app);

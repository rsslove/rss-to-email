const RssToEmail = require('rss-to-email');

module.exports = (request, response) => {
  const config = request.body || {};
  const rssToEmail = RssToEmail(config);

  rssToEmail.getEmail(config.format || 'html')
    .then(email => {
      response.writeHead(200, {
        'Content-Type': 'text/html ',
      });
      response.end(email);
    })
    .catch(e => {
      console.error(e);
      response.writeHead(500, {
        'Content-Type': 'text/html ',
      });
      response.end('Something went wrong. Please check the server logs for more info.')
  });
};

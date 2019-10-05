const RssToEmail = require('rss-to-email');

module.exports = (request, response) => {
  const headers = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
  headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';

  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
  } else {
    const config = request.body || {};
    const rssToEmail = RssToEmail(config);

    rssToEmail.getEmail(config.format || 'html')
      .then(email => {
        response.writeHead(200, {
          ...headers,
          'Content-Type': 'text/html ',
        });
        response.end(email);
      })
      .catch(e => {
        console.error(e);
        response.writeHead(500, {
          ...headers,
          'Content-Type': 'text/html ',
        });
        response.end('Something went wrong. Please check the server logs for more info.')
      });
  }
};

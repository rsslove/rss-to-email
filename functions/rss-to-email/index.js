const RssToEmail = require('rss-to-email');

module.exports = (request, response) => {
  console.log(request.query);
  console.log(request.body);

  // Previous code
  // const config = req.body || {};
  // const rssToEmail = RssToEmail(config);
  // rssToEmail.getEmail(config.format || 'html')
  //   .then(email => {
  //     res.writeHead(200, {
  //       'Content-Type': 'text/html ',
  //     });
  //     res.end(email);
  //   });

  return response.send('It works!');
};

const RssToEmail = require('rss-to-email');

function getConfig(context) {
  return context.query || {};
}

function getFormat(context) {
  return context && context.query && context.query.format ? context.query.format : 'html';
}

module.exports = function(context, req, res) {
  const rssToEmail = RssToEmail(getConfig(context));
  rssToEmail.getEmail(getFormat(context))
    .then(email => {
      res.writeHead(200, { 'Content-Type': 'text/html '});
      res.end(email);
    });
};

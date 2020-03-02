var qs = require('querystring')
  , http = require('http')

module.exports = function search (query, fn) {
  http.request({
      host: 'www.sogou.com'
    , path: '/web.json?' + qs.stringify({ query })
  }, function (res) {
    res.setEncoding('utf8');

    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      try {
        var obj = JSON.parse(body);
      } catch (e) {
        return fn(new Error('Bad twitter response'));
      }

      fn(null, obj.results);
    });
  }).end()
};
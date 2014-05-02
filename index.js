var express = require('express');
var needle = require('needle');
var optimist = require('optimist');
var yaml = require('js-yaml');

var app = express();
var router = express.Router();

var argv = optimist.usage('$0 --data-uri [dataUri]').argv;
var dataUri = process.env.DATA_URI || argv['data-uri'];

var data;

app.use(function(req, res, next) {

  needle.get(dataUri, function(error, response) {
    if(error) {
      res.send(500);
    } else {
      if(response.headers['content-type'].indexOf('json') >= 0 || dataUri.indexOf('.json') >= 0) {
        data = JSON.parse(response.body);
      } else {
        data = yaml.safeLoad(response.body);
      }
      next();
    }
  });

});

router.get('/', function(req, res) {
  res.send(data);
});

router.get('/:slug', function(req, res) {

  if(data[req.params.slug]) {
    res.redirect(data[req.params.slug].link);
  } else {
    res.send(404);
  }

});

app.use(router);

app.listen(process.env.PORT || 3000);
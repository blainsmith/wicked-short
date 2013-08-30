var http = require('http');
var url = require('url');
var querystring = require('querystring');
var config = require('./config.json');

var redis = require('redis').createClient(6379, '127.0.0.1');

redis.on('error', function(err){
  console.log('Redis Error: ' + err);
  process.exit(1);
});

var generateKey = function(callback){
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i=0; i < 7; i++ ){
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    redis.exists(key, function(err, reply){
      if(reply === 0) return callback(key);
      else generateKey(callback);
    });
    
};

http.createServer(function(req, res){
  var method = req.method;
  var uri = url.parse(req.url);
  var qs = querystring.parse(uri.query);

  if(uri.pathname == '/'){
    console.log(uri);
    res.end();
  }else if(uri.pathname == config.endpoint){

    generateKey(function(key){

      var json = {
        url: 'http://orig.com/url',
        shortUrl: key
      };
      var jsonString = JSON.stringify(json);

      redis.set(key, jsonString);

      res.writeHead(200, {
        'Content-Length': jsonString.length,
        'Content-Type': 'text/plain'
      });
      res.write(jsonString);
      res.end();
    });

  }else{
    res.writeHead(404, 'Not found');
    res.end();
  }
}).listen(3000);
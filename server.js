var http = require('http');
var url = require('url');
var querystring = require('querystring');
var config = require('./config.json');

//var redis = require('redis').createClient(6379, '127.0.0.1');

// redis.on('error', function(err){
//   console.log('Redis Error: ' + err);
//   process.exit(1);
// });

var generateId = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

http.createServer(function(req, res){
  var method = req.method;
  var uri = url.parse(req.url);
  var qs = querystring.parse(uri.query);

  if(uri.pathname == '/'){
    console.log(uri);
    res.end();
  }else if(uri.pathname == config.endpoint){
    var json = {
      url: 'http://orig.com/url',
      shortUrl: generateId()
    };
    var jsonString = JSON.stringify(json);

    res.writeHead(200, {
      'Content-Length': jsonString.length,
      'Content-Type': 'text/plain'
    });
    res.write(jsonString);
    res.end();
  }else{

  }

  res.writeHead(404, 'Not found');
  res.end();
}).listen(3000);
/*
    NodeJS reverse proxy to make requests with CORS headers.
        1. node node-proxy-cors
        2. Make a request to http://localhost/?url=http://www.someapi.com

        Run : npm start
        Two environment variable :
        process.env.ORIGIN
        process.env.PORT
        
*/
var express = require('express');
var request = require('request');

var app = express();
const port = process.env.PORT || 80;
const origin = process.env.ORIGIN || '*';

//enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', origin);
  /*  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
*/
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,HEAD,OPTIONS,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,cache-control,if-modified-since,pragma,X-CSRF-TOKEN,X-CSRF-TOKEN-ADMIN,USER-OBJECT,username,password,authorization'
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Access-Control-Allow-Origin,Access-Control-Allow-Credentials,SET-CSRF-TOKEN,SET-CSRF-TOKEN-ADMIN,USER-OBJECT'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//proxy
app.use('/', function (req, res) {
  var url = req.query.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
  console.log('Server is running on PORT:', port);
});

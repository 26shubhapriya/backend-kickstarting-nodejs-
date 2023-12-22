const http = require('http');

const routes = require('./routes')

console.log(routes.someText)

const server  = http.createServer(routes.handler)
    //console.log('shubha priya');
    //process.exit();
    //console.log(req.url, req.method,req.headers);
    // const url = req.url;
    // const method = req.method;

   

server.listen(4000);

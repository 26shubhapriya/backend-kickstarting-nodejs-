const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/'){

        fs.readFile("message.txt",{ encoding: "utf-8" },(err, data) => {
            if(err){
                console.log(err);
            }
        console.log('data from file' + data);
        res.write('<html');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    });
        

    }
    else if(url === '/message' && method === 'POST')
    {
        const body = [];
        req.on('data',(chunk) => {
            //console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>
        {
            const parsedBoody = Buffer.concat(body).toString();
            const message = parsedBoody.split('=')[1];
            fs.writeFile('message.txt',message,(err) => {
                if(err)
                {
                    console.log(err);
                }
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
            });
        })
        
    }
    else
    {
        res.setHeader('Content-Type','text/html');
        res.write('<html');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my node.js server</h1></body>')
        res.write('</html>');
        res.end();
    }
}

//module.exports = requestHandler;

// module.exports ={
//     handler : requestHandler,
//     someText : 'some hard coded text'
// }

exports.handler = requestHandler;
exports.someText = 'some hard coded text';

// else if(url ==='/home'){
//     res.write('<html><head><title>Welcome Home</title></head><body><h1>Welcome home</h1></body></html>');
// } else if (req.url === '/about') {
//     res.write('<html><head><title>About Us</title></head><body><h1>Welcome to About Us page</h1></body></html>');
// } else if (req.url === '/node') {
//     res.write('<html><head><title>Node.js Project</title></head><body><h1>Welcome to my Node.js project</h1></body></html>');
// } else {
//     // Default response for other URLs
//     res.write('<html><head><title>Not Found</title></head><body><h1>404 - Not Found</h1></body></html>');
// }

// res.end();
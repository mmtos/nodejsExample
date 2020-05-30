const http = require('http');

const server = http.createServer( (req,res) => {
	res.write('<h1>Hello</h1>')
	res.end('<p>nodeJs world</p>')
});

server.listen(8080, () =>{
	console.log('Node.js WebServer Listening 8080  Now....')
});

server.on('error', (e) =>{
	console.error(e);
});
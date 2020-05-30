const http = require('http');
const fs = require('fs');

const server = http.createServer( (req,res) => {
	fs.readFile('./sendHtml.html',(err,data) =>{
		if(err){throw err;}
		res.end(data);
	});
});

server.listen(8080, () =>{
	console.log('Node.js WebServer Listening 8080  Now....')
});

server.on('error', (e) =>{
	console.error(e);
});
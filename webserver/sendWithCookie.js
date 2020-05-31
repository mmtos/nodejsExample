const http = require('http');

const parseCookie = ( cookie = '') =>
	cookie
		.split(';')
		.map(v => v.split('='))
		.reduce((acc, [k, v]) => {
		  acc[k.trim()] = decodeURIComponent(v);
		  return acc;
		}, {});
		
http.createServer( (req,res) => {
	const cookies = parseCookie(req.headers.cookie);
	console.log(req.url,cookies);
	res.writeHead(200,{'Set-Cookie': 'mycookie=test'});
	res.end('Hello Cookie');
	
}).listen(8082,()=>{
	console.log('Listen 8082...')
});
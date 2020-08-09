#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';
const htmlTemplete = `<html></html>`;
const routerTemplete = `const express = require('express');
const router = express.Router();`;

//use fs function
const exist = (dir) => {
	try{
		//엑세스 가능여부
		fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
		return true;
		
	}catch(e){
		return false;
	}
};

const mkdirp = (dir) => {
	const dirname = path
	.relative('.',path.normalize(dir))
	.split(path.sep)
	.filter(p => !!p);
	dirname.forEach((d,idx) =>{
		const pathBuilder = dirname.slice(0,idx+1).join(path.sep);
		//위의 exist 사용
		if(!exist(pathBuilder)){
			//웹서버가 아니므로 동기방식으로 해도 무관
			fs.mkdirSync(pathBuilder);
		}
	});
};

const makeTemplete = () =>{
	mkdirp(directory);
	if(type === 'html'){
		const pathToFile = path.join(directory,`${name}.html`);
		if(exist(pathToFile)) console.error('이미 해당 파일이 존재합니다.');
		else {
			fs.writeFileSync(pathToFile,htmlTemplete);
			console.log(pathToFile,'생성 완료');
		}
	}else if(type ==='router'){
		const pathToFile = path.join(directory,`${name}.js`);
		if(exist(pathToFile)) console.error('이미 해당 파일이 존재합니다.');
		else {
			fs.writeFileSync(pathToFile,routerTemplete);
			console.log(pathToFile,'생성 완료');
		}
	}else{
		console.error('html 또는 router 둘중 하나를 입력하세요');
	}
};

const main = () =>{
if(!type || !name) console.error('사용법: cli html|router 파일명 [생성경로]');
else makeTemplete();
};
main();
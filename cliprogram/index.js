#!/usr/bin/env node
console.log('Hello Cli',process.argv)
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
console.clear();
const answerCallback = (answer) =>{
	if(answer === 'y'){
		console.log('y selected');
		rl.question('계속하시겠습니까? (y/n)', answerCallback);
	}else if(answer === 'n'){
		console.log('n selected');
		rl.close();
	}else{
		console.clear();
		console.log('y 또는 n만 입력하세요');
		rl.question('다시 입력(y/n)', answerCallback);
	}
	//callback 방식의 비동기 처리라서 else쪽 로직을 타더라도 닫혀버림 
	//rl.close();	
}
rl.question('계속하시겠습니까? (y/n)', answerCallback);
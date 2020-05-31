function getUser(){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(xhr.status === 200){
			var users = JSON.parse(xhr.responseText);
			var list = document.getElementById('list');
			list.innerHTML = '';
			Object.keys(users).map(function (key){
				var userDiv = document.createElement('div');
				var span = document.createElement('span');
				span.textContent= users[key];
				
				//수정
				var edit = document.createElement('button');
				edit.textContent ='수정';
				//클릭 이벤트 등록
				edit.addEventListener('click',function(){
					var name = prompt('바꿀 이름을 입력하세요');
					if(!name){
						return alert('이름을 반드시 입력하셔야 합니다')
					}
					var xhr =new XMLHttpRequest();
					xhr.onload = function(){
						if(xhr.status === 200){
							console.log(xhr.responseText);
							getUser();
						}else{
							console.error(xhr.responseText);
						}
					};
					xhr.open('PUT','/users/'+key);
					xhr.setRequestHeader('Content-Type','application/json');
					xhr.send(JSON.stringify({name:name}));
				});
				
				//삭제
				var remove = document.createElement('button');
				remove.textContent ='삭제';
				//클릭 이벤트 등록
				remove.addEventListener('click',function(){
					
					var xhr =new XMLHttpRequest();
					xhr.onload = function(){
						if(xhr.status === 200){
							console.log(xhr.responseText);
							getUser();
						}else{
							console.error(xhr.responseText);
						}
					};
					xhr.open('DELETE','/users/'+key);
					xhr.send();
				});
				userDiv.appendChild(span);
				userDiv.appendChild(edit);
				userDiv.appendChild(remove);
				list.appendChild(userDiv);
				
			}); //end user info mapping on html
		}else{
			//fail to get user info
			console.error(xhr.responseText);	
		}
	}; //end xhr.onload event after getting user info 
	xhr.open('GET','/users');
	xhr.send();
}
window.onload = getUser;

//form submit event for insert user info
document.getElementById('form').addEventListener('submit',function(e){
	e.preventDefault(); //prevent send req instantly, for a validation and seding xhr req  
	var name = e.target.username.value;
	if(!name){
		return alert('이름을 입력하세요')
	}
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(xhr.status === 201 ){
			//201 means 'created'
			console.log(xhr.responseText);
			getUser();
		}else{
			console.error(xhr.responseText);
			
		}
	};
	xhr.open('POST','/users');
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify({name:name}));
	name = '';
});
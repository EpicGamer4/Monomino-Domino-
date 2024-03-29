//function showMenu(){navLinks.style.right = "0";} 색바꾸기 참조하기
//난수 생성 코드 1~3 리턴함.
// var rd = Math.floor(Math.random() * 3) + 1;
// 배열에 담아서 처리를 하고 난 뒤에 페이지에 보여줌.
// 1. 빨강 0,0에 블럭을 담는다.
// 2. 방향키로 움직인다.
// 3. 보낸다.
//4. 맨 처음에 블록 하나 있어야 한다. 그냥 내가 적어둔다. 우선은.
//블럭을 보낸다.
//도착한다.
//지울거 지운다.
//다음 블럭 생성한다.
//끝.
//빨강에서 움직이는거 구현하기
//블럭 보내기 만들자.
// 현재는 모든 처리가 끝났을떄 색을 칠함.
// setTimeout(지연 후 호출할 함수, 지연 시간.);
// 1 블럭을 보내고 난 후의 모습
// 2 블럭이 사라지는 모습
//도착하면 지우기 전에 보여줘야 한다.




var score = 0, x, y, type = 2;

var red = 	[
				[1,0,0,0],
				[1,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			];

var green = [
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			];

var blue = 	[
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			];

document.addEventListener('keydown', keyInput, false);

function keyInput(e){
  	if(e.keyCode == 38){ //up
  		up();
  	}else if(e.keyCode == 40){ //d
  		down();
  	}else if(e.keyCode == 37){ //l
  		left();
  	}else if(e.keyCode == 39){ //r
  		right();
  	}else if(e.keyCode == 32){ //space

  		send();

  		setTimeout(function(){	
	  		lineProcess();	
  		},300);


  		create();
  	}

  	document.getElementById("score").innerHTML = " SCORE : " + score;
  	paintRed();
  	paintBlue();
  	paintGreen();
}



function lineProcess(){
	while(clearCheck(blue) != 0){
		while(clearCheck(blue) != 0){
			lineClear(blue, clearCheck(blue));
			score++;
		}
		allTheWayDown(blue);
	}

	while(clearCheck(green) != 0){
		while(clearCheck(green) != 0){
			lineClear(green, clearCheck(green));
			score++;

		}
		allTheWayDown(green);
	}

	while (overFlow(blue)){
		pushDown(blue,5);
	}
	while (overFlow(green)){
		pushDown(green,5);
	}

}

function pushDown(arr, row){
	lineClear(arr,row);
	for (var i = row; i >= 1; i--){
		for (var j = 0; j < 4; j++){
			arr[i][j] = arr[i-1][j];
		}
	}
	lineClear(arr,0);
}

function overFlow(arr){
	for(var i = 0; i < 2; i++){
		for (var j = 0; j < 4; j++){
			if(arr[i][j] != 0) return true;
		}
	}
	return false;
}

function emptyLine(arr){
	var count = 0;
	var row = 0;
	for (var i = 5; i >=2; i-- ){
		count = 0;
		for (var j = 0; j < 4; j++){
			if(arr[i][j] != 0) count++;
		}
		if(count == 0) {
			row = i;
			break;
		}
	}
	return row;
}

function allTheWayDown(arr){
	var temp = 0;
	for (var i = emptyLine(arr) - 1; i >= 0; i--) {
		for (var j = 0; j < 3; j++) {
			if (arr[i][j] == 1) {
				temp = arr[i][j];
				arr[i][j] = 0;
				arr[findBottom(arr, i, j)][j] = temp;
			}
			if(arr[i][j] == 2 && arr[i][j+1] == 2){
				arr[i][j] = arr[i][j+1] = 0;
				var index = Math.min((findBottom(arr,i,j)),(findBottom(arr,i,j+1)));
				arr[index][j] = arr[index][j+1] = 2;
			}
		}
		if(arr[i][3] == 1){
			temp = arr[i][3];
			arr[i][3] = 0;
			arr[findBottom(arr, i, 3)][3] = temp;
		}
	}
}

function lineClear(arr, row){
	arr[row][0] = arr[row][1] =arr[row][2] =arr[row][3] = 0;
}

function clearCheck(arr){
	for(var i = 5; i >= 2; i--){
		var count = 0;
		for (var j = 0; j < 4; j++){
			if(arr[i][j] != 0) count++;
		}
		if(count == 4) {
			return i;
		}
	}
	return 0;
}

function send(){
	var v = Math.abs(y-3);
	if(type == 1){
		green[findBottom(green,1,x)][x] = 1;
		blue[findBottom(blue,1,v)][v] = 1;
	}else if(type == 2){
		green[findBottom(green,1,x)][x] = 1;
		green[findBottom(green,1,x)][x] = 1;
		var index = Math.min((findBottom(blue,1,v)),(findBottom(blue,1,v-1)));
		blue[index][v] = blue[index][v-1] = 1;
	}else{
		var index = Math.min((findBottom(green,1,x)),(findBottom(green,1,x+1)));
		green[index][x] = green[index][x+1] = 1;
		blue[findBottom(blue,1,v)][v] = 1;
		blue[findBottom(blue,1,v)][v] = 1;
	}

}

function findBottom(arr, to, col){
	for(var i = to; i < 6; i++){
		if(arr[i][col] != 0){
			return i-1;
		}
	}
	return 5;
}

function create(){
	type = Math.floor(Math.random() * 3) + 1;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			red[i][j] = 0;
		}
	}
	x = 0;
	y = 0;
	if(type == 1){
		red[0][0] = 1;
	}else if(type == 2){
		red[0][0] = 1;
		red[1][0] = 1;
	}else if(type == 3){
red[0][0] = 1;
		red[0][1] = 1;
	}
}

function paintRed(){
	var flag = false;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(red[i][j] == 1){
				if(!flag){
					x = j;
					y = i;
					flag = true;
				}
				document.getElementById("red" + i + j).style.background="red";
			}else{
				document.getElementById("red" + i + j).style.background="lightpink";
			}
		}
	}
}

function paintBlue(){
	//grey
	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 4; j++){
			document.getElementById("blue" + i + j).style.background="lightgrey";
		}
	}
	//light blue
	for(var i = 2; i < 6; i++){
		for(var j = 0; j < 4; j++){
			document.getElementById("blue" + i + j).style.background="lightblue";
		}
	}
	//actual blocks?
	for(var i = 0; i < 6; i++){
		for(var j = 0; j < 4; j++){
			if(blue[i][j] == 1){
				document.getElementById("blue" + i + j).style.background="blue";
			}
		}
	}
	
}

function paintGreen(){
	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 4; j++){
			document.getElementById("green" + i + j).style.background="lightgrey";
		}
	}
	for(var i = 2; i < 6; i++){
		for(var j = 0; j < 4; j++){
			document.getElementById("green" + i + j).style.background="lightgreen";
		}
	}
	for(var i = 2; i < 6; i++){
		for(var j = 0; j < 4; j++){
			if(green[i][j] == 1){
				document.getElementById("green" + i + j).style.background="green";
			}
		}
	}
}

function up(){
	for(var i = 0; i < 4; i++){
		if(red[0][i] == 1){
			return;
		}
	}
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(red[i][j] == 1){
				red[i][j] = 0;
				red[i-1][j] = 1;
			}
		}
	}
}

function down(){
	for(var i = 0; i < 4; i++){
		if(red[3][i] == 1){
			return;
		}
	}
	for(var i = 2; i >= 0; i--){
		for(var j = 0; j < 4; j++){
			if(red[i][j] == 1){
				red[i][j] = 0;
				red[i+1][j] = 1;
			}
		}
	}
}

function left(){
	for(var i = 0; i < 4; i++){
		if(red[i][0] == 1){
			return;
		}
	}
	for(var i = 1; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(red[j][i] == 1){
				red[j][i] = 0;
				red[j][i-1] = 1;
			}
		}
	}
}

function right(){
	  for(var i = 0; i < 4; i++){
		if(red[i][3] == 1){
			return;
		}
	}
	for(var i = 2; i >= 0; i--){
		for(var j = 0; j < 4; j++){
			if(red[j][i] == 1){
				red[j][i] = 0;
				red[j][i+1] = 1;
			}
		}
	}
}
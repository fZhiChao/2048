var board = new Array();
var score = 0;
var merge = new Array();

$(function(){
	//位置初始化
	start();
	
	$("a").click(function(){
		$(".over").remove();
		score = 0;
		$('span').text(score);
		start();
	})
	function start(){
		restart();
		
		ranNumber();
		ranNumber();
	}
	
	
	//最初的位置
	function restart(){
		score = 0;
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			var square = $("#square-"+ i +"-"+ j);
			var distanceTop = i * 120;
			var distanceLeft = j * 120;
			square.css("top",distanceTop + 20);
			square.css("left",distanceLeft + 20);
		}}
		//告诉数字方块已经初始化了
		for(var i=0; i<4; i++){
			board[i] = new Array();
			merge[i] = new Array();
			for(var j=0; j<4; j++){
				board[i][j] = 0;
				merge[i][j] = false;
			}
	}numSquear();} 
	
	//显示随机的数字块
	function numSquear(){
		$(".number").remove();	//避免重复造数字方块
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				//新建16个数字小方块
				$("#box").append("<div class='number' id='number-"+i+"-"+j+"'></div>");
				var numberSquare = $("#number-"+ i +"-"+ j);
				var distanceTop = i * 120;
				var distanceLeft = j * 120;
				
				if( board[i][j] == 0){		//初始化时的样式
					numberSquare.css("width",0+"px");
					numberSquare.css("height",0+"px");
					numberSquare.css("top",distanceTop + 70);
					numberSquare.css("left",distanceLeft + 70);
				}else{						//游戏时的样式
					numberSquare.css("top",distanceTop + 20);
					numberSquare.css("left",distanceLeft + 20);
					numberSquare.css("width",100+"px");
					numberSquare.css("height",100+"px");
					numberSquare.css("backgroundColor",numberBg(board[i][j]));
					numberSquare.css("color",numColor(board[i][j]));
					numberSquare.css("fontSize",numSize(board[i][j])+"px");
					numberSquare.text(board[i][j]);
				}merge[i][j] = false;
			}
		}	
		}
	
	//随机数的设置
	function ranNumber(){
		if(space(board)){
			return false;
		}
		//随机的位置
		var x = parseInt(Math.floor(Math.random() * 4));
		var y = parseInt(Math.floor(Math.random() * 4));
		var time = 50;
		while(time>0){
			if(board[x][y] == 0)
				break;			//位置不重复
			//重新选择位置
			x = parseInt(Math.floor(Math.random() * 4));
			y = parseInt(Math.floor(Math.random() * 4));
			time--;
		}
		if(time == 0){
			for(var i=0; i<4; i++){
				for(var j=0; j<4; j++){
					if(board[i][j] != 0){
						x = i;
						y = j;
					}
				}
			}
		}
		
		//随机生成2或4
		var radom = Math.random()>0.5? 2 : 4;
		
		//让随机数显示在生成的随机位置上
		board[x][y] = radom;
		showNumber(x , y , radom);
		//setTimeout(showNumber,300);
		return true;
	}
	
$(document).keydown(function(event){
	//event.preventDefault();
	
		switch(event.keyCode){
			case 37:
				if(moveLeft()){
					setTimeout(ranNumber,300);
					setTimeout(isSpace,300);
				}
				break;
			case 38:
				if(moveUp()){
					setTimeout(ranNumber,300);
					setTimeout(isSpace,300);
				}
				break;
			case 39:
				if(moveRight()){
					setTimeout(ranNumber,300);
					setTimeout(isSpace,300);
				}
				break;
			case 40:
				if(moveDown()){
				setTimeout(ranNumber,300);
				setTimeout(isSpace,300);
				}
				break;
			default: break;
		}
	});
	
	
function isSpace(){
	
	if(space(board) && nomove(board)){
		//alert("GAME OVER");
		$("#box").append("<div class='over'>GAME OVER</div>");
		//$("#box").addClass("over");
	}
}

	function moveLeft(){
		if(!canMoveLeft(board)){	//判断能否移动
			return false;
		}
		
		for(var i=0; i<4; i++){
			for(var j=1; j<4; j++){
				if(board[i][j] != 0){
					
					for(var k=0; k<j; k++){
						if((board[i][k] == 0) && obstacle(i, k ,j ,board)){
							//alert(i,k);
							moveAnimate(i, j, i, k);	//移动动画
							board[i][k] = board[i][j]; 
							board[i][j] = 0;
							break;
						}else if(board[i][j] == board[i][k] && obstacle(i, k ,j ,board) && !merge[i][k]){
							//alert(i,k);
							moveAnimate(i, j, i, k);	//移动动画
							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k];
							setTimeout("$('span').text(score)",250);
							merge[i][k] = true;
							break;
						}
					}
				}
			}
		}
		setTimeout(numSquear,300);	//延迟300毫秒执行
		return true;
	}
	
	function moveRight(){
		if(!canMoveRight(board)){	//判断能否移动
			return false;
		}
		
		for(var i=0; i<4; i++){
			for(var j=2; j>=0; j--){
				if(board[i][j] != 0){
					
					for(var k=3; k>j; k--){
						if((board[i][k] == 0) && obstacle1(i, k ,j ,board)){
							//alert(i,k);
							moveAnimate(i, j, i, k);	//移动动画
							board[i][k] = board[i][j]; 
							board[i][j] = 0;
							break;
						}else if((board[i][j] == board[i][k]) && obstacle1(i, k ,j ,board) && !merge[i][k]){
							//alert(i,k);
							moveAnimate(i, j, i, k);	//移动动画
							board[i][k] += board[i][j];
							board[i][j] = 0;
							score += board[i][k];
							setTimeout("$('span').text(score)",250);
							merge[i][k] = true;
							break;
						}
					}
				}
			}
		}
		setTimeout(numSquear,300);	//延迟300毫秒执行
		return true;
	}

	function moveUp(){
		if(!canMoveUP(board)){	//判断能否移动
			return false;
		}
		
		for(var i=1; i<4; i++){
			for(var j=0; j<4; j++){
				if(board[i][j] != 0){
					
					for(var k=0; k<i; k++){
						if((board[k][j] == 0) && obstacle2(i, k ,j ,board)){
							//alert(i,k);
							moveAnimate(i, j, k, j);	//移动动画
							board[k][j] = board[i][j]; 
							board[i][j] = 0;
							break;
						}else if((board[i][j] == board[k][j]) && obstacle2(i, k ,j ,board) && !merge[k][j]){
							//alert(i,k);
							moveAnimate(i, j, k, j);	//移动动画
							board[k][j] += board[i][j];
							board[i][j] = 0;
							score += board[k][j];
							setTimeout("$('span').text(score)",250);
							merge[k][j] = true;
							break;
						}
					}
				}
			}
		}
		setTimeout(numSquear,300);	//延迟300毫秒执行
		return true;
	}
	
	function moveDown(){
		if(!canMoveDown(board)){	//判断能否移动
			return false;
		}
		
		for(var i=2; i>=0; i--){
			for(var j=0; j<4; j++){
				if(board[i][j] != 0){
					
					for(var k=3; k>i; k--){
						if((board[k][j] == 0) && obstacle3(i, k ,j ,board)){
							//alert(i,k);
							moveAnimate(i, j, k, j);	//移动动画
							board[k][j] = board[i][j]; 
							board[i][j] = 0;
							continue;
						}else if((board[i][j] == board[k][j]) && obstacle3(i, k ,j ,board) && !merge[k][j]){
							//alert(i,k);
							moveAnimate(i, j, k, j);	//移动动画
							board[k][j] += board[i][j];
							board[i][j] = 0;
							score += board[k][j];
							setTimeout("$('span').text(score)",250);
							merge[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout(numSquear,300);	//延迟300毫秒执行
		return true;
	}
	
});


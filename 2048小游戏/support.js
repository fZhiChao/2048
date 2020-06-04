function numberBg(number){		//随机块的背景颜色
	switch(number){
		case 2:return "#254496";
				break;
		case 4:return "#153264";
				break;
		case 8:return "#541234";
				break;
		case 16:return "#a32154";
				break;
		case 32:return "#12a541";
				break;
		case 64:return "#bf2";
				break;
		case 128:return "#fbc";
				break;
		case 256:return "#cb9";
				break;
		case 512:return "#fbc";
				break;
		case 1024:return "#ca1";
				break;
		case 2048:return "#bc9";
				break;
		case 4096:return "#bb1";
				break;
		case 8192:return "#bf2";
				break;
		default	:return "black";
	}
	
}

function numColor(number){		//字体颜色
	if(number <= 8){
		return "white";
	}else{
		return "##3D4444";
	}
}

function numSize(number){
	if(number>64 && number<1024){
		return "50";;
	}else if(number>=1024){
		return "30";
	}else{
		return "";
	}
	
}

function nomove(board){		//判断周边是否能相加
	if(canMoveLeft(board) || canMoveRight(board) ||
		canMoveUP(board) || canMoveDown(board)){
			return false;
		}
	return true;
}

function space(board){			//判断是否还有空间
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			if(board[i][j] == 0){
				return false;
			}
	}
}	return true;
}

function canMoveLeft(board){
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			
			if(board[i][j] !=0){
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}	
	return false;
}

function canMoveRight(board){
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			
			if(board[i][j] !=0){
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}	
	return false;
}


function canMoveUP(board){
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			
			if(board[i][j] !=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}	
	return false;
}

function canMoveDown(board){
	for(var i=2; i>=0; i--){
		for(var j=0; j<4; j++){
			
			if(board[i][j] !=0){
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}	
	return false;
	
}

function obstacle(x, y2 ,y1 ,board){
	for(var i=y2+1; i<y1; i++)
		if(board[x][i] != 0)
			return false;
	return true;
}	//判断是否有障碍物

function obstacle1(x, y2 ,y1 ,board){
	for(var i=y2-1; i>y1; i--)
		if(board[x][i] != 0)
			return false;
	return true;
}	//判断是否有障碍物

function obstacle2(x, y2 ,y1 ,board){
	for(var i=y2+1; i<x; i++)
		if(board[i][y1] != 0)
			return false;
	return true;
}	//判断是否有障碍物

function obstacle3(x, y2 ,y1 ,board){
	for(var i=y2-1; i>x; i--)
		if(board[i][y1] != 0)
			return false;
	return true;
}	//判断是否有障碍物
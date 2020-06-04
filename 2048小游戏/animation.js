function showNumber(x , y , number){
	var postion = $("#number-"+ x +"-" + y);
	postion.css("backgroundColor",numberBg(number));
	postion.css("color",numColor(number));
	postion.text(number);
	
	//动画效果
	postion.animate({
		width: 100,
		height: 100,
		top: x*120+20,
		left: y*120+20
	},300)
	
}		//显示随机数字2或4出现

function moveAnimate(i, j, x, k){
	
	var newBox = $("#number-"+ i +"-"+ j);
	var sumx =x*120+20;
	var sumy =k*120+20;
	newBox.animate({
		left: sumy,
		top: sumx
		
	},300)
}

function scoreAnimate(score){
	$("span").text(score).animate({
		
	},1000)
	
}
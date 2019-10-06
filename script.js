      function draw() {
        var canvas = document.getElementById('graph');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
    //////////////////////////////////////////////////////////////////////////////////////////////
    /// Берем начальные значения ширины и высоты графика
    //////////////////////////////////////////////////////////////////////////////////////////////
    var graphWidth = canvas.getAttribute("width");
    var graphHeight = canvas.getAttribute("height");
    //////////////////////////////////////////////////////////////////////////////////////////////
    /// Функция создает сетку с осями x и y и переносит начало координат в середину. Нужно при
    ///изменении размеров графика так, как выставляет центр в нужное место в отличие от createAxes
    //////////////////////////////////////////////////////////////////////////////////////////////
    function setLines (graphWidth,graphHeight) {
    ctx.translate(graphWidth/2, graphHeight/2);
    ctx.beginPath();
    ctx.moveTo(0, graphHeight/2);
    ctx.lineTo(0, -graphHeight/2);
    ctx.moveTo(-graphWidth, 0);
    ctx.lineTo(graphWidth, 0);
    ctx.lineWidth = 2; ////////////////////////////////////////// Тут можно менять толщину осей
    ctx.stroke();
    ctx.closePath();
    ctx.font = '15px serif';
  	ctx.fillText('X', graphWidth/2-20, -15);
  	ctx.fillText('Y', 15, -graphHeight/2+20);
    }
    setLines(graphWidth,graphHeight);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    /// Просто рисует оси координат после очистки прошлых резултатов. Не ставит центр в новое место,
    ///этим занимается setLines (creating of axes lines) 
    ///////////////////////////////////////////////////////////////////////////////////////////////
   function createAxes() {  
    var graphWidth = canvas.getAttribute("width");
    var graphHeight = canvas.getAttribute("height"); 
    ctx.beginPath();
    ctx.moveTo(0, graphHeight/2);
    ctx.lineTo(0, -graphHeight/2);
    ctx.moveTo(-graphWidth, 0);
    ctx.lineTo(graphWidth, 0);
    ctx.lineWidth = 2; ///////////////////////////////////////////////////// line Width
    ctx.stroke();
    ctx.closePath();
    ctx.font = '15px serif';
  	ctx.fillText('X', graphWidth/2-20, -15);
  	ctx.fillText('Y', 15, -graphHeight/2+20);
  	}
  	
  	////////////////////////////////////////////////////////////////////////////////////////////
  	/// Функция рисования точек
  	////////////////////////////////////////////////////////////////////////////////////////////
  	function drawPixel (x, y, r, g, b, w, h) {
    ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    ctx.fillRect( x, y, w, h );

	}
	////////////////////////////////////////////////////////////////////////////////////////////
	/// Функция очистки предыдущего изображения canvas clear function 
	///////////////////////////////////////////////////////////////////////////////////////////
	function canvasClear(){
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
	}
	////////////////////////////////////////////////////////////////////////////////////////////
	/// Функция получения рандомного целого числа в заданном интервале
	///////////////////////////////////////////////////////////////////////////////////////////

	function getRandomInt(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min; 
	}	
	///////////////////////////////////////////////////////////////////////////////////////////
	///Функция создания фрактала
	///Передаем координаты начальной точки, координаты вершин A,B и C, число итераций и шаг
	//////////////////////////////////////////////////////////////////////////////////////////
	function fractal (startPointX,startPointY,ATopCoordinateX,ATopCoordinateY,BTopCoordinateX,BTopCoordinateY,CTopCoordinateX,CTopCoordinateY, numOfIterations){
	for (var i = 0; i < numOfIterations; i++) {        //Цикл расстановки точек
	var newPointX, newPointY;                          //Переменные для координат новой точки
	var diceRoll = getRandomInt(1,7);				   //"Бросаем кубик"
			if ((diceRoll==1)||(diceRoll==2)) {
			newPointX = (startPointX + ATopCoordinateX)/(2);
			newPointY = (startPointY + ATopCoordinateY)/(2);	
			drawPixel(newPointX,newPointY,0,0,0,2,2);
			startPointX=newPointX;
			startPointY=newPointY;
			} else {
				if ((diceRoll==3)||(diceRoll==4)) {
				newPointX = (startPointX + BTopCoordinateX)/(2);
				newPointY = (startPointY + BTopCoordinateY)/(2);
				drawPixel(newPointX,newPointY,0,0,0,2,2);
				startPointX=newPointX;
				startPointY=newPointY;	
				} else {
					if ((diceRoll==5)||(diceRoll==6)) {
					newPointX = (startPointX + CTopCoordinateX)/(2);
					newPointY = (startPointY + CTopCoordinateY)/(2);
					drawPixel(newPointX,newPointY,0,0,0,2,2);
					startPointX=newPointX;
					startPointY=newPointY;	
					}
				}

			}
				


		}
	}
		
///////////////////////////////////////////////////////////////////////////////////////////
///Функция нажатия на кнопку изменения размера графика
///////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("btn2").onclick=function(){
	var width = document.getElementById("width").value;
	var height = document.getElementById("height").value;
	var graph = document.getElementById("graph");
	graph.setAttribute("width", width);
	graph.setAttribute("height", height);
	setLines(width,height);
}	
///////////////////////////////////////////////////////////////////////////////////////////
///Функция нажатия на кнопку построения фрактала
///////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('btn').onclick = function() {
	canvasClear();											//Очищаем после предыдущего построения
	createAxes();											//Заного чертим оси
	var graphWidth = canvas.getAttribute("width");
    var graphHeight = canvas.getAttribute("height");	
    console.log(graphWidth);
    console.log(graphHeight);
	var numOfIterations = document.getElementById("iterations").value;
///////////////////////////////////////////////////////////////////////////////////////////
///Функция строит начальные вершины
///////////////////////////////////////////////////////////////////////////////////////////
	function ABC (graphWidth,graphHeight) {
		var x1,y1,x2,y2,x3,y3 ;
		x1 = getRandomInt(-graphWidth/2+15,graphWidth/2-15);
		x2 = getRandomInt(-graphWidth/2+15,graphWidth/2-15);
		x3 = getRandomInt(-graphWidth/2+15,graphWidth/2-15);
		y1 = getRandomInt(-graphHeight/2+15,graphHeight/2-15);
		y2 = getRandomInt(-graphHeight/2+15,graphHeight/2-15);
		y3 = getRandomInt(-graphHeight/2+15,graphHeight/2-15);
		
		drawPixel(x1,y1,0,0,0,5,5);
		ctx.fillText("A", x1+5,y1+5);
		drawPixel(x2,y2,0,0,0,5,5);
		ctx.fillText("B", x2+5,y2+5);
		drawPixel(x3,y3,0,0,0,5,5);
		ctx.fillText("C", x3+5,y3+5);
		console.log([x1,y1]);
		console.log([x2,y2]);
		console.log([x3,y3]);
		return ([x1,y1,x2,y2,x3,y3])
	}
	var ABCTops=ABC(graphWidth,graphHeight);
	var ATopCoordinateX = ABCTops[0];   ///////////////// Coordinates of A, B and C
	var ATopCoordinateY = ABCTops[1];
	var BTopCoordinateX = ABCTops[2];
	var BTopCoordinateY = ABCTops[3];
	var CTopCoordinateX = ABCTops[4];
	var CTopCoordinateY = ABCTops[5];
	///////////////////////////////////////////////////////////////////////////////////////////
	///Функция ставит начальную точку
	///////////////////////////////////////////////////////////////////////////////////////////
	function startPoint (){
		startPointX = getRandomInt(-graphWidth/2+15,graphHeight/2-15);
		startPointY = getRandomInt(-graphWidth/2+15,graphHeight/2-15);
		drawPixel(startPointX,startPointY,255,0,0,5,5); ////////////// red color ///////////////
		return([startPointX,startPointY])
	}
	var getStartPointCoordinates = startPoint();
	var startPointX = getStartPointCoordinates[0];  // Start point coordinate X
	var startPointY = getStartPointCoordinates[1];  // Start point coordinate Y


    fractal(startPointX,startPointY,ATopCoordinateX,ATopCoordinateY,BTopCoordinateX,BTopCoordinateY,CTopCoordinateX,CTopCoordinateY, numOfIterations);
}

}
}

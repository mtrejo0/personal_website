var points = [];
var weightInput;
var dateInput;
var submit;

function setup() {
 createCanvas(windowWidth, windowHeight);
 weightInput = createInput();
 weightInput.position(20, 65);
 dateInput = createInput();
 dateInput.position(20, 125);

 submit = createButton("Submit");
 submit.position(20,150)
 submit.mousePressed(alterPoint);
}

function alterPoint	()
{
	var correct = true;
	var w = weightInput.value();
	var d = dateInput.value();
	if(!(isInt(parseInt(w,10)) || isFloat(parseInt(w,10))))
	{
		if(w>0)
		{
			correct = false;
		}
		
	}

	if(!(d[2] == "/" && d[5] == "/" && d.length==8))
	{
		correct = false;
	}

	if(correct)
	{
		var include = false;
		for (var i = points.length - 1; i >= 0; i--) {
			
			if(points[i][0] == weightInput.value() && points[i][1] == dateInput.value())
			{
				include = true;
			}
			
		}
		
		if(!include)
		{points.push([parseInt(w,10),
			[parseInt(d[0]+d[1],10) ,
			parseInt(d[3]+d[4],10),
			parseInt(d[6]+d[7],10) ]]	
			);}
		/*else if(include)
		{
			
			var index;
			for (var i = points.length - 1; i >= 0; i--) {
				if(points[i] == [weightInput.value(),dateInput.value()])
				{
					index = i;
				}
			}
			points.splice(i,1);
		}*/
	}
	

	sortArr(points)
	console.log(points)
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}




function draw() {


 background(255);
 fill("black");
 text("Weight",20,50);
 text("Date (DD/MM/YYYY)",20,110);

 rectMode(CORNERS)
 fill("black")
 rect(100,200,windowWidth-100,windowHeight-100)

 var maxW = -Infinity;
 var minW = Infinity;
 for (var i = points.length - 1; i >= 0; i--) {
 	if(maxW<points[i][0])
 	{
 		maxW = points[i][0];
 	}
 	if(minW>points[i][0])
 	{
 		minW = points[i][0];
 	}

 }
 
 
 
 maxW = (maxW/10|0)*10+10
 minW = (minW/10|0)*10
 

 if(points.length>0){
 	fill("black")
 	text(maxW,60,200)
 	text(minW,60,windowHeight-100)
 }

 var pX;
 var pY;
 for (var i = points.length - 1; i >= 0; i--) {
 	fill("red")
 	var y = map(points[i][0],minW,maxW,0,windowHeight-300);
 	var y = windowHeight-100-y
 	//console.log(y)

 	var x = points[i][1][0]
 	var x = 100+x*50
 	if(pX == null && pY == null)
 	{
 		pX = x;
 		pY = y;
 	}
 	else
 	{
 		
 		push();
 		stroke("red");
 		line(pX,pY,x,y);
 		
 		pop();
 		pX = x;
 		pY = y;
 	}
 	//console.log(x,y)
 	text(points[i][1],x,windowHeight-50)

 	ellipse(x,y,5,5)
 }

}

function sortArr()
{
	for(var i = points.length-1;i>=0;i--)
	{
		var m = i;
		for (var j = i; j >= 0; j--) {
			if(points[m][1]<points[j][1])
			{
				m = j
			}
		}
		temp = points[m]
		points[m] = points[i]
		points[i] = temp
	}
	
}
var sliderVert;
var sliderHor;
var periodX;
var periodY;
var x;
var y;
var pX;
var pY;
var time;
var button;

var positions = [];

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);
   
  sliderVert = createSlider(0, 100, 50);
  sliderVert.position(20, 20);
  sliderVert.size(windowWidth/3,50)
  sliderHor = createSlider(0, 100, 50);
  sliderHor.size(windowWidth/3,50)

  sliderHor.position(20, 50);

  button = createButton("Clear");
  button.position(20,100);
  
  

  time = 0;



}

function mousePressed()
{
  positions = []
  console.log("ok")

}
function draw() {
  createCanvas(windowWidth,windowHeight);

  console.log(positions)
  sliderHor.size(windowWidth/3,50)
  sliderVert.size(windowWidth/3,50)

  
  text("X Period",windowWidth/2,55);
  text("Y Period",windowWidth/2,75);
  button.mousePressed(clear);

  periodX = map(sliderVert.value(),0,100,0,2*PI);
  periodY = map(sliderHor.value(),0,100,0,2*PI);
  time+=.05;

  x = windowWidth/6*cos(periodX*time);
  y = windowWidth/6*sin(periodY*time);


  
  positions.push([x,y])
  
  
  past = null
  for (var i = positions.length - 1; i >= 0; i--) {
    push()
    translate(windowWidth/2,windowHeight/2)
    if(past == null){past = positions[i]}
    line(positions[i][0],positions[i][1],past[0],past[1])
    
    past = positions[i]
    pop()

  }

  

}


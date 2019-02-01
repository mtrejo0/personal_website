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

function setup() {
  // put setup code here
  createCanvas(windowWidth-10,windowHeight-10);
   
  sliderVert = createSlider(0, 100, 50);
  sliderVert.position(20, 20);
  sliderVert.size(300,50)
  sliderHor = createSlider(0, 100, 50);
  sliderHor.size(300,50)
  sliderHor.position(20, 50);

  button = createButton("Clear");
  button.position(20,100);
  

  time = 0;


}

function draw() {

  
  text("X Period",380,55);
  text("Y Period",380,75);
  button.mousePressed(clear);

  periodX = map(sliderVert.value(),0,100,0,2*PI);
  periodY = map(sliderHor.value(),0,100,0,2*PI);
  time+=.05;

  x = 200*cos(periodX*time);
  y = 200*sin(periodY*time);
  
  //console.log(x,y)
  
  
  push();
  translate(windowWidth/2,windowHeight/2);
  stroke(0);
  line(pX,pY,x,y);
  pop();
  pX = x;
  pY = y;

  

}


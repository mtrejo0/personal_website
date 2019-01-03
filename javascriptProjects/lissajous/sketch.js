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
   
  sliderVert = createSlider(0, 2*PI, PI);
  sliderVert.position(20, 20);
  sliderHor = createSlider(0, 2*PI, PI);
  sliderHor.position(20, 50);

  button = createButton("Clear");
  button.position(20,80);
  

  time = 0;


}

function draw() {


  text("X Period",180,40);
  text("Y Period",180,65);
  button.mousePressed(clear);

  periodX = sliderVert.value();
  periodY = sliderHor.value();
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


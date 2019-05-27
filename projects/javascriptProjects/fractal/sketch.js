

var angle;
var gold;
var slider;
var len;

function setup() {
  // put setup code here
  createCanvas(600,600);


  
  
  sliderAngle = createSlider(0,PI,PI/4,.01);
  sliderLength = createSlider(0,150,50,1);
  sliderChange = createSlider(0,1,.5,.01);



}

function draw() {

  background(0);


  textSize(20);
  fill(255);
  angle = sliderAngle.value();
  text('Angle0 = '+angle,0,20);

  len = sliderLength.value();
  text('Length = '+len,0,40);

  change = sliderChange.value();
  text('Change = '+change,0,60);



    
  translate(width/2,height);
  stroke(255);
  fractal(len);



}



 function fractal(length) {

  
  line(0,0,0,-length);
  translate(0,-length);

  if(length>4)
  {
    push();
    rotate(angle);
    fractal(length*change);
    pop();


    push();
    rotate(-angle);
    fractal(length*change);
    pop();
    

  }

 }

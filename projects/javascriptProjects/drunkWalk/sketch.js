 var length;
var width;
var walk = [];
var position;
var old;
var randomX;
var randomY;
var color;
var slider;
function setup() {
  // put setup code here


  createCanvas(windowWidth, windowHeight);
  position = createVector(windowWidth/2,windowHeight/2);
  old = createVector(position.x,position.y);
  color = 1;

  slider = createSlider(1, 70, 30);
  slider.position(20, 20);

  randomX = random(20);
  randomY = random(20);
  position.x+=random(-randomX,randomX);
  position.y+=random(-randomY,randomY);
  background(0);

  frameRate(slider.value());
  

}

function draw() {
  
  frameRate(slider.value());
  fill(255);
  text("Speed", 180, 40);
  
  
  color = (color+1)%100;
  colorMode(HSB, 100);
  stroke(color, 255, 255);
  

  line(position.x,position.y,old.x,old.y);
  old = createVector(position.x,position.y);
  randomX = random(slider.value());
  randomY = random(slider.value());
  position.x+=random(-randomX,randomX);
  position.y+=random(-randomY,randomY);




  //point(position.x,position.y);
  
}







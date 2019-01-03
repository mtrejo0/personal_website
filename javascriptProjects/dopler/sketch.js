
var waves = []
var time= 0;
var manualButton;
var manual = false;
var circleButton;
var circle = false;
var sliderA = null;
var sliderB = null;
var sliderC = null;
var pos;
var pY;
var pX;
var linearButton;
var linear = false;
var sinu = 0;
var sinButton;

function setup() {
  // put setup code here
 createCanvas(windowWidth-10,windowHeight-10);
  
  manualButton = createButton("Manual"); 
  manualButton.position(10,10);
  manualButton.mousePressed(manualFunction);

  circleButton = createButton("Circle"); 
  circleButton.position(10,50);
  circleButton.mousePressed(circleFunction);
  
  linearButton = createButton("Linear"); 
  linearButton.position(10,90);
  linearButton.mousePressed(LinearFunction);

  sinButton = createButton("Sinusodial"); 
  sinButton.position(10,130);
  sinButton.mousePressed(sinusoidal);

  

  


}


function sinusoidal()
{
  setup();
  time = 0;
  sinu = true;
  linear = false;
  manual = false;
  circle = false;
  if(sliderA != null)
    {sliderA.remove();}
  if(sliderB != null)
    {sliderB.remove();}
  if(sliderC != null)
    {sliderC.remove();}
  
  pos = createVector();
  sliderA = createSlider(3, 30, 10);
  sliderA.position(windowWidth-150, 20);

  sliderB = createSlider(1, 300, 100);
  sliderB.position(windowWidth-150, 60);

  sliderC = createSlider(10, 100, 75);
  sliderC.position(windowWidth-150, 100);
  waves = [];

}
function LinearFunction()
{
  sinu = false;
  linear = true;
  manual = false;
  circle = false;
  if(sliderA!= null)
    {sliderA.remove();}
  if(sliderB!= null)
    {sliderB.remove();}
  if(sliderC!= null)
    {sliderC.remove();}
  
  time = 0;
  pos = createVector();
  sliderA = createSlider(3, 30, 10);
  sliderA.position(windowWidth-150, 20);

  sliderB = createSlider(1, 1000, 100);
  sliderB.position(windowWidth-150, 60);
  waves = []

}
function circleFunction()
{
  sinu = false;
  linear = false;
  manual = false;
  circle = true;
  if(sliderA!= null)
    {sliderA.remove();}
  if(sliderB!= null)
    {sliderB.remove();}
  if(sliderC!= null)
    {sliderC.remove();}
  
  time = 0;
  pos = createVector();
  sliderA = createSlider(3, 30, 10);
  sliderA.position(windowWidth-150, 20);

  sliderB = createSlider(1, 300, 100);
  sliderB.position(windowWidth-150, 60);

  sliderC = createSlider(100, 200, 150);
  sliderC.position(windowWidth-150, 100);
  waves = [];
}

function manualFunction()
{ 
  sinu = false;
  linear = false;
  manual = true;
  circle = false;
  if(sliderA!= null)
    {sliderA.remove();}
  if(sliderB!= null)
    {sliderB.remove();}
  if(sliderC!= null)
    {sliderC.remove();}
  sliderA = createSlider(5, 60, 30);
  sliderA.position(windowWidth-150, 20);
  waves = [];

  
}


function draw() {
  //console.log(waves.length);

  if(linear)
  {
    background("white");
    fill(0);
    
    pos.x += sliderB.value()/100;
    pos.y = windowHeight/2;
    if(pos.x>windowWidth)
    {
      pos.x = 0;
    }
    text("Intensity",windowWidth-250, 40);
    text("Speed",windowWidth-250, 80);
    time++;

    if(time %sliderA.value() == 0)
    {
      waves.push(new wave(pos.x,pos.y));
    }

    for (var i = waves.length - 1; i >= 0; i--) {
      waves[i].update();
      waves[i].display();

    }
    for (var i = waves.length - 1; i >= 0; i--) {
      if(waves[i].radius > 1.5*windowWidth)
      {
        waves.splice(i,1);
      }
    }
  }
  if(manual)
  {
    
    
    background("white");
    fill(0);

    text("Intensity",windowWidth-250, 40);
    
    
    time++;

    if(time %sliderA.value() == 0)
    {
      waves.push(new wave(mouseX,mouseY));
    }

    for (var i = waves.length - 1; i >= 0; i--) {
      waves[i].update();
      waves[i].display();

    }
    for (var i = waves.length - 1; i >= 0; i--) {
      if(waves[i].radius > 1.5*windowWidth)
      {
        waves.splice(i,1);
      }
    }
  }
  if(circle)
  {
    background("white");
    fill(0);
    var radius = sliderB.value();
    var frequency = sliderC.value();
    

    pos.x = windowWidth/2+radius*cos(frequency/1000*time);
    pos.y = windowHeight/2+radius*sin(frequency/1000*time);


    text("Intensity",windowWidth-250, 40);
    text("Radius",windowWidth-250, 80);
    text("Frequency",windowWidth-250, 120)

    push();
    
    stroke(0);
    line(pX,pY,pos.x,pos.y);
    pop();
    pX = pos.x;
    pY = pos.y;

   

    time++;

    if(time %sliderA.value() == 0)
    {
      waves.push(new wave(pos.x,pos.y));
    }

    for (var i = waves.length - 1; i >= 0; i--) {
      waves[i].update();
      waves[i].display();

    }
    for (var i = waves.length - 1; i >= 0; i--) {
      if(waves[i].radius > 1.5*windowWidth)
      {
        waves.splice(i,1);
      }
    }
  }
  if(sinu == 1)
  {
    background("white");
    fill(0);
    var amp = sliderB.value();
    var frequency = sliderC.value();
    

    pos.x = windowWidth/2;
    pos.y = windowHeight/2+amp*sin(frequency/1000*time);


    text("Intensity",windowWidth-250, 40);
    text("Amplitude",windowWidth-250, 80);
    text("Frequency",windowWidth-250, 120)


   

    time++;

    if(time %sliderA.value() == 0)
    {
      waves.push(new wave(pos.x,pos.y));
     
    }

    for (var i = waves.length - 1; i >= 0; i--) {
      waves[i].update();
      waves[i].display();

    }
    for (var i = waves.length - 1; i >= 0; i--) {
      if(waves[i].radius > 1.5*windowWidth)
      {
        waves.splice(i,1);
      }
    }

    
  
  }
  





  

}


function wave(x,y)
{
  this.pos = createVector(x,y);
  this.radius = 1;

  this.update = function()
  {
    this.radius+=10;
  }
  this.display = function()
  {
    noFill();
    ellipse(this.pos.x,this.pos.y, this.radius,this.radius);
  }
}


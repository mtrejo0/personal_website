var goal;
var racer; 
var inKp;
var inKd;
var inKi;
var velI;
var positions = []
var time;
var past;
var reset;

function setup() {
  // put setup code here
 createCanvas(windowWidth-10,windowHeight-10);
 racer = new Rocket();
 goal = windowHeight/2

  inKp = createInput();
  inKp.position(100,25);
  
  
  time=0
  inKd = createInput();
  inKd.position(300,25 );
  

  inKi = createInput();
  inKi.position(500,25);

 
  inKp.value(.001)
  inKd.value(.0001)
  inKi.value(.00001)

   reset = createButton("Reset"); 
  reset.position(windowWidth-100,10);
  reset.mousePressed(resetF);
 
}

function resetF()
{
  racer.pos.x = 0
  racer.time = 0 
  racer.pError = 0;
  racer.kP = 1/1000
  racer.kD = 1/10000
  racer.kI = 1/100000
  racer.pos = createVector(0,windowHeight-50);
  racer.vel = createVector(2,0);
  racer.acc = createVector(0,0);
  positions = []
}
function mousePressed()
{
  if(mouseY>100){
    goal = mouseY
  }
  
}


function draw() {



 
  background("white")
  racer.update();
  racer.display();
  line(0,goal,windowWidth,goal)

  text("Error: " + racer.pError, 700, 35)
  text("kP",60,35)
  text("kD",270 ,35)
  text("kI",480,35)
  if(time%1==0){
  positions.push([racer.pos.x,racer.pos.y])}
  past = null
  for (var i = positions.length - 1; i >= 0; i--) {
    
    if(past == null){past = positions[i]}
    line(positions[i][0],positions[i][1],past[0],past[1])
    
    past = positions[i]

  }
 
 time++;
  
  
  
  
}




function Rocket()
{
  this.pos = createVector(0,windowHeight-50);
  this.init = 0
  this.vel = createVector(2,0);
  this.acc = createVector(0,0);
  this.color = "red"
  this.time = 0
  this.pError = 0;
  this.kP = 1/1000
  this.kD = 1/10000
  this.kI = 1/100000



 
  this.PID = function()
  {
      
      error = goal-this.pos.y;
      

      P = error*this.kP
      I = this.kI/this.time*(error-this.pError)
      D = this.time*this.kD*(error-this.pError)

      this.acc = createVector(0,1).mult( P+I+D)
      this.pError = error;
  }
  
  this.update = function() {
      this.time ++;
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      this.kP = inKp.value()
      this.kD = inKd.value()
      this.kI = inKi.value()
      


      if(this.pos.x>windowWidth)
      {
        
        resetF();

      }

      
        this.PID()
           
  };

  

  this.display = function() {


    push();
    fill(this.color);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
    rectMode(CENTER)
    rect(0,0,20,10)

    pop();
  };


}
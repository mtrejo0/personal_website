var goal;
var racer;

function setup() {
  // put setup code here
 createCanvas(windowWidth,windowHeight);
 racer = new Rocket();
}


function draw() {
  createCanvas(windowWidth,windowHeight);
  

 
  background("white")
  racer.update();
  racer.display();
  goal = [mouseX,mouseY]
  
  
}




function Rocket()
{
  this.pos = createVector(windowWidth/2,windowHeight/2);
  this.vel = createVector(.000001,0);
  this.acc = createVector(0,0);
  this.theto = 0;
  this.omega = 0;
  this.alpha = 0;

  this.color = "red"
  this.time = 0
  this.pError = 0;
  this.kP = 1/1000
  this.kD = 1/10000
  this.kI = 1/100000



 
  this.PIDangle = function()
  {
      

      mouseAngle = atan2(mouseY-this.pos.y,mouseX-this.pos.x)
      
      error = mouseAngle - this.theto 
      console.log(mouseAngle,error);
     

      P = error*this.kP
      I = this.kI/this.time*(error-this.pError)
      D = this.time*this.kD*(error-this.pError)


      this.alpha = (P+I+D)
      
      this.pError = error;
  }
  
  this.update = function() {


      
      this.time ++;
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);


      this.theto += this.omega
      this.omega += this.alpha
      this.alpha = 0
      console.log(this.time)

      

      this.vel.rotate(this.omega) 

      if(dist(mouseX,mouseY,this.pos.x,this.pos.y)>100){
        this.pos.x += cos(this.theto)
        this.pos.y += sin(this.theto)
      }

      this.PIDangle()
      
      
  };

  

  this.display = function() {


    push();
    fill(this.color);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
    rectMode(CENTER)
    
    
    line(0,0,1000,0)
    line(0,0,1000,100)
    line(0,0,1000,-100)
    rect(0,0,20,10)

    pop();
  };


}
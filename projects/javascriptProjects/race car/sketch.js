var racer;
var objects = []
var time;
var positions =[];
function setup() {
  // put setup code here
 createCanvas(windowWidth-10,windowHeight-10);
 racer = new Rocket();
 time = 0;
 objects.push(new block([[windowWidth*2/3,-1000],[windowWidth,1000]]))
}

function mousePressed()
{
  startPoint = [mouseX,mouseY];
  noLoop();
}
function mouseReleased()
{
  endPoint = [mouseX,mouseY];

  objects.push(new block([startPoint,endPoint]) )
  loop();
}


function draw() {



 
  background("white")
  racer.update();
  racer.display();
  if(time%10 == 0){
  positions.push([racer.pos.x,racer.pos.y])}
  for (var i = objects.length - 1; i >= 0; i--) {

    objects[i].update()
    objects[i].display()
    
  }
 
  for (var i = positions.length - 1; i >= 0; i--) {
    fill("red")
    ellipse(positions[i][0],positions[i][1],10,10)
  }
  time++;
  
  
}




function Rocket()
{
  this.pos = createVector(windowWidth/2+50,windowHeight-50);
  this.vel = createVector(2,-2);
  this.acc = createVector(0,0);
  this.color = "red"
  this.time = 0
  this.pError = 0;
  this.kP = -1/4000;
  this.kD = -1/9000
  this.kI = -1/300000;



  this.bang = function()
  {
      d = this.avgDist();
      console.log(d)
      velH = this.vel.heading()
      if(d<200)
      {
        this.acc = createVector(cos(velH-PI/2)/1000,sin(velH-PI/2)/1000)
      }
      if(d> 200)
      {
        //this.vel.rotate(PI/1000)
        this.acc = createVector(cos(velH+PI/2)/1000,sin(velH+PI/2)/1000)
      }
  }
  this.PID = function()
  {
      d = this.avgDist();
      error = 200-d;
      

      velH = this.vel.heading()

      angle = velH+PI/2
      P = error*this.kP
      I = this.kI/this.time*(error-this.pError)
      D = this.time*this.kD*(error-this.pError)

      this.acc = createVector(cos(angle),sin(angle)).mult( P+I+D)
      this.pError = error;
  }
  
  this.update = function() {
      this.time ++;
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(2)


      //this.vel.add(createVector(cos(this.vel.heading()),sin(this.vel.heading())))

      
      if(this.pos.y<0)
      {
        this.pos.y = windowHeight-10
        //positions = []
      }
      
        this.PID()
      

      for (var j = objects.length - 1; j >= 0; j--) {
        if(this.pos.x > objects[j].points[0][0] && this.pos.x < objects[j].points[1][0] && 
          this.pos.y > objects[j].points[0][1] && this.pos.y < objects[j].points[1][1])
        {
         noLoop()
        
        }
        if(this.pos.x > objects[j].points[1][0] && this.pos.x < objects[j].points[0][0] && 
          this.pos.y > objects[j].points[1][1] && this.pos.y < objects[j].points[0][1])
        {
          noLoop()
        }
      }
      





      

           
  };

  this.avgDist = function(){
    sum = 0;
    count = 0;
    angle = PI/2+PI/6
    weight = .8
    while(angle>PI/2-PI/6 )
    {
      sum+=this.dist(angle)*weight
      count++
      angle-=.1
      if(angle>PI/2)
      {
        weight+=.05
      }
      else
      {
        weight-=.05
      }

    }
    return sum/count
  }

  
  

  this.dist = function(angle)
  {
    var dist = 0;
    var hit = false
    var curr = createVector(this.pos.x,this.pos.y);
    while(!hit && dist < 300)
    {
      
      for (var j = objects.length - 1; j >= 0; j--) {
        if(curr.x > objects[j].points[0][0] && curr.x < objects[j].points[1][0] && 
          curr.y > objects[j].points[0][1] && curr.y < objects[j].points[1][1])
        {
          hit = true;
       
        }

        if(curr.x > objects[j].points[1][0] && curr.x < objects[j].points[0][0] && 
          curr.y > objects[j].points[1][1] && curr.y < objects[j].points[0][1])
        {
          hit = true;
        }
      }
      curr.x = curr.x+cos(this.vel.heading()+angle)*.1
      curr.y = curr.y+sin(this.vel.heading()+angle)*.1
      dist += .1
    }

    return dist
  }
 

  this.display = function() {

    angle = PI/2+PI/6
    
    while(angle> PI/2-PI/6)
    {
    line(this.pos.x, this.pos.y, this.pos.x+cos(this.vel.heading()+angle)*300,this.pos.y+sin(this.vel.heading()+angle)*300)
    angle-=.1
    }
    push();
    fill(this.color);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
    rectMode(CENTER)
    rect(0,0,20,10)

    pop();
  };


}

function block([[a,b],[c,d]])
{
  this.points = [[a,b],[c,d]]
  this.pos = createVector(a,b);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.color = "red"

  this.update = function() {

      
      this.points[0][1] += this.vel.y;
      this.points[1 ][1] += this.vel.y;

      

      
      
                
  };

  this.display = function() {
    
    push();
    
    rectMode(CORNERS)
    fill(this.color);
    rect(this.points[0][0],this.points[0][1],this.points[1][0],this.points[1][1])
    pop();
  };



}
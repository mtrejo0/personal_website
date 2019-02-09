var rockets = [];
var color = 0;
var time;
var goal;
var origin;
var numMoves = 200;
var num = 100;
var genNum = 0;
var objects = [];

var startPoint;
var endPoint;
function setup() {
  // put setup code here
  //frameRate(30);
  createCanvas(windowWidth -5 , windowHeight -5);
 
  goal = [windowWidth-100,windowHeight/2,20];
  time = 0;
  origin = createVector(50,windowHeight/2);

  for (var i =num; i >= 0; i--) {
    rockets.push(new Rocket());
  }
  startPoint = createVector();
  endPoint = createVector();


}

function draw() {
  background('black');
  textSize(20);
  fill(255);
  text("Generation: "+ genNum,10,30);

  
  
  if(time < numMoves){
    for (var i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    rockets[i].display();
    //console.log(rockets[i].fitness);
    }
    time++;
  }
  else
  {
    newGen(); 
    genNum++;
  }
  

 
  //rect(200,windowHeight/2-100,10,200);

  ellipse(goal[0],goal[1],goal[2],goal[2]);

  for (var i = objects.length - 1; i >= 0; i--) {
    rectMode(CORNERS);
    fill("white");
    rect(objects[i][0][0],objects[i][0][1],objects[i][1][0],objects[i][1][1])
  }
  


  

}

function mousePressed()
{
  startPoint = [mouseX,mouseY];
  noLoop();
}
function mouseReleased()
{
  endPoint = [mouseX,mouseY];

  objects.push([startPoint,endPoint])
  loop();
}


function newGen()
{
  time = 0;
  var maxFit = -Infinity;
  var minFit = Infinity;
  var bestRocket;
  for (var i = rockets.length - 1; i >= 0; i--) {
    var fit = rockets[i].getFitness();
    
    
    if(fit>maxFit)
    {
      maxFit = fit;
      bestRocket = rockets[i];
      
    }
    if(fit<minFit)
    {
      minFit = fit;
      
    }
  }
  
  for (var i = rockets.length - 1; i >= 0; i--) {
    rockets[i].fitness = rockets[i].fitness/maxFit;
    
  }


  var pool = [];
  for (var i = rockets.length - 1; i >= 0; i--) {
    var n = rockets[i].fitness*50;
    for (var j = n; j >= 0; j--) {
      pool.push(rockets[i]);
    }
  }

  rockets = [];
  
  for (var i = num; i >= 0; i--) {
    rockets.push(new Rocket());
  }

  for (var i = rockets.length- 1; i >= 0; i--) {
    rockets[i].moves = mate(random(pool),random(pool));
    rockets[i].moves = mutation(rockets[i].moves);
  }

}

function mutation(movesToMutate)
{
  var movesMutated = []
  
  for (var i = movesToMutate.length - 1; i >= 0; i--) {
    if(random(1)<0.01)
    {
      var x = random(-1,1);
      var y = random(-1,1);
      
      movesMutated.push([x,y])
    }
    else
    {
      movesMutated.push(movesToMutate[i]);
    }
    
  }
  return movesMutated;
}
function mate(rocketA,rocketB)
{
  var babyMoves = [];
  var index = random(rocketA.moves.length);
  for (var i = rocketA.moves.length-1; i >= 0; i--) {
    if(i<index)
    {
      babyMoves.push(rocketA.moves[i]);
    }
    else
    {
      babyMoves.push(rocketB.moves[i]);
    }  
  }

  
  return babyMoves;


}



function Rocket()
{
	this.pos = createVector(origin.x,origin.y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.moves = [];
  this.win = false;
  this.lose = false;

  this.fitness = -Infinity;
  this.index = 0;
  this.color = "white";
  this.time = -Infinity;

  for (var i = numMoves; i >= 0; i--) {
    var x = random(-1,1);
    var y = random(-1,1);
    this.moves.push([x,y]);
    

  }
  
  

  
	this.update = function() {
    if(!this.win && !this.lose){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      if(this.index < this.moves.length)
      {
        this.acc = createVector(this.moves[this.index][0],this.moves[this.index][1]);
        this.index++;
      }

      if(this.pos.x > goal[0]-goal[2]/2 && this.pos.x < goal[0]+goal[2]/2 && this.pos.y > goal[1]-goal[2]/2 && this.pos.y < goal[1]+goal[2]/2)
      {
        this.win = true;
        this.time = this.index;
      }
      if(this.pos.x<0 || this.pos.x>windowWidth || this.pos.y<0 || this.pos.y>windowHeight)
      {
        this.lose = true;
      }

      for (var j = objects.length - 1; j >= 0; j--) {

        x1 = objects[j][0][0]
        y1 = objects[j][0][1]

        x2 = objects[j][1][0]
        y2 = objects[j][1][1]
        if(this.pos.x > x1 && this.pos.x < x2 && this.pos.y > y1 && this.pos.y < y2)
        {
        this.lose = true;
       
        }

        if(this.pos.x < x1 && this.pos.x > x2  && this.pos.y < y1 && this.pos.y > y2)
        {
        this.lose = true;
        }

        if(this.pos.x > x1 && this.pos.x < x2 && this.pos.y < y1 && this.pos.y > y2)
        {
        this.lose = true;
       
        }

        if(this.pos.x < x1 && this.pos.x > x2  && this.pos.y > y1 && this.pos.y < y2)
        {
        this.lose = true;
        }

        
        




      }

    }

           
  };

  this.getFitness = function()
  {
     var dist = sqrt(pow((this.pos.x-goal[0]),2)+pow((this.pos.y-goal[1]),2));
      this.fitness = 1000000/(pow(dist,2));

      if(this.win)
      {
        this.fitness *=50;
        this.fitness -= 100/(pow(this.time,2))

      }
      if(this.lose)
      {
        this.fitness /= 50;
      }
      return this.fitness;
      
  };

 

  this.display = function() {
    push();
    fill(this.color);
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
  	
    beginShape();
    vertex(10, 0);
    vertex(-10, -5);
    vertex(-10, 5);
    endShape(CLOSE);

    pop();
  };


}



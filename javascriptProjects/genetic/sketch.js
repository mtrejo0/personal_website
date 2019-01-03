var rockets = [];
var color = 0;
var time;
var goal;
var origin;
var bestRocket;
var numMoves = 1000;
var num = 100;
var genNum = 0;
function setup() {
  // put setup code here
  //frameRate(30);
  createCanvas(windowWidth -5 , windowHeight -5);
 
  goal = createVector(windowWidth-100,windowHeight/2);
  time = 0;
  origin = createVector(50,windowHeight/2);

}

function draw() {
  background('black');
  textSize(20);
  fill(255);
  text("Generation: "+ genNum,10,30);
  if(genNum==0)
  {
    text("Loading...",300,30);
  }

  
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

  ellipse(goal.x,goal.y,10,10);


  

}



function newGen()
{
  time = 0;
  var bestFit = -Infinity;
  for (var i = rockets.length - 1; i >= 0; i--) {
    var fit = rockets[i].getFitness();
    
    if(fit>bestFit)
    {
      bestFit = fit;
      bestRocket = rockets[i];
    }
  }
  for (var i = rockets.length - 1; i >= 0; i--) {
    rockets[i].fitness = rockets[i].getFitness/bestFit;
  }
  rockets = [];

  var pool = []
  for (var i = rockets.length - 1; i >= 0; i--) {
    var n = rockets[i].getFitness;
    for (var j = n; j >= 0; j--) {
      pool.push(rockets[i]);
    }
  }

  var newRockets = [];
  for (var i = num; i >= 0; i--) {
    newRockets.push(mate(random(pool),random(pool)));
  }




   for (var i = num; i >= 0; i--) {
    rockets.push(new Rocket());
  }
  if(bestRocket != null)
  {
    for (var i = rockets.length - 10; i >= 0; i--) {
      rockets[i].moves = mutation(bestRocket.moves);
    }
    rockets[0].moves = bestRocket.moves;
    rockets[0].color = "red";
  
  }
  

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

  var baby = new Rocket();
  baby.moves = babyMoves;
  return baby;

}


function mutation(moves)
{

  
  var temp = [];
  for (var i = 0; i <moves.length; i++) {
    temp.push(moves[i]);
    
  }


  for (var i = moves.length-1-moves.length/floor(random(0,10)); i >= 0; i-=floor(random(0,10))) {
    temp[i] = createVector(random(-5,5),random(-5,5));
  }

  return temp;
}







function Rocket()
{
	this.pos = createVector(origin.x,origin.y);
  this.moves = [];
  this.fitness = -Infinity;
  this.index = 0;
  this.color = "white";
  for (var i = numMoves; i >= 0; i--) {
    this.moves.push(createVector(random(-5,5),random(-5,5)));
  }

  
	this.update = function() {
      this.pos.add(this.vel);
     

      if(this.index < this.moves.length)
      {
        this.vel = this.moves[this.index];
        this.index++;
      }

      /*if(this.pos.x<205 && this.pos.x>195 && this.pos.y>(windowHeight/2-100) && this.pos.y<windowHeight/2+100)
      {
        this.pos = createVector(-10000000,-10000000);
        //console.log("danger");
        this.fitness = - Infinity;
      } */

      
      
     
  };

  this.getFitness = function()
  {
     var dist = sqrt(pow((this.pos.x-goal.x),2)+pow((this.pos.y-goal.y),2));
      this.fitness = 1000000/(pow(dist,2));
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
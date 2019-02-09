var rocket;
var aliens = [];
var bullets = [];
var bitSize = 25;
var moves = [];
var w = 500;
var h = 500;
var time;
var moveIndex;


function setup() {
  createCanvas(windowWidth-10,windowHeight-10);
  rocket = new Rocket(10,19);

  for (var i = 15; i >= 0; i--) {
    for (var j = 4; j >= 0; j--) {
      aliens.push(new Alien(i,j));
    } 
  }
  for (var i = 3; i >= 0; i--) {
    moves.push([1,0]);
  }
  moves.push([0,1]);
  for (var i = 3; i >= 0; i--) {
    moves.push([-1,0]);
  }
  moves.push([0,1]);
  console.log(moves);

  moveIndex = 0;
  time = 0;


  
   


}

function draw() {
  // put drawing code here
  
  translate(windowWidth/2-250,windowHeight/2-250);
  
  background("black");
  stroke("white");
  line(0,0,500,0);
  line(0,0,0,500);
  line(500,500,500,0);
  line(500,500,0,500);
  for (var i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();
  }
  for (var i = aliens.length - 1; i >= 0; i--) {
    if(time%50 == 0)
    {
      aliens[i].update();
      
    }
    aliens[i].display();
  }
  if(time%50==0){
    moveIndex = (moveIndex+1)%moves.length;
  }
  
 
  
  rocket.display();


  time++;

}



function keyPressed() {
  if (keyCode === RIGHT_ARROW  && rocket.pos.x<(w/bitSize-1)) {
    rocket.thrust(1);
  }
  if (keyCode === LEFT_ARROW  && rocket.pos.x>0) {
    rocket.thrust(-1);
  }
  if (keyCode === 32) {
    bullets.push(new Bullet(rocket.pos.x,rocket.pos.y,-.25));
    
  }
}






function Bullet(x,y,speed)
{
  this.pos = createVector(x,y);
  this.vel = createVector(0,speed);
  
  
  
  this.update = function() {
      this.pos.add(this.vel);

  };

  this.display = function() {
    push();
    fill("white");
    ellipseMode(CENTER);
    translate(this.pos.x*bitSize+bitSize/2,this.pos.y*bitSize);

    ellipse(0,0,5,5);

    pop();
  };


}



function Alien(x,y)
{
  this.pos = createVector(x,y);
  this.vel = 0;
  this.size = bitSize-5 ;
  

  
  
  this.update = function() {
      this.vel = createVector(moves[moveIndex][0],moves[moveIndex][1]);

      
      this.pos.add(this.vel);

      
  };

  this.display = function() {
    push();
    translate(this.pos.x*bitSize,this.pos.y*bitSize);
    ellipseMode(CORNER);
    fill("white")

    ellipse(0,0,this.size,this.size);

    pop();
  };




}





function Rocket(x,y)
{
	this.pos = createVector(x,y);
  this.size = bitSize;
  
	


	this.update = function() {


  };


  this.thrust = function(direction)
  {
    this.pos.x+=direction;
    
  };



  this.display = function() {
    push();
    translate(this.pos.x*bitSize,this.pos.y*bitSize);
    fill("white")
    rectMode(CORNER);

    rect(0,0,this.size,this.size);
    pop();
  };


}
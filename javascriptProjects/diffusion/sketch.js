var length = 500;
var width = 500;
var particles = [];
var slider;
function setup() {
  // put setup code here
  length = windowHeight;
  width  = windowWidth;
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(1, 70, 1);
  slider.position(20, 20);
  

}

function draw() {
  // put drawing code here
  background('black');
   frameRate(slider.value());
  fill(255);
  text("Speed", 180, 40);

  
  
  if(mouseIsPressed && !(mouseX<200 && mouseY<50))
  {
    particles.push(new Particle(mouseX,mouseY))
  }

  
  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    

  }
}





function Particle(x,y)
{
  this.x = x;
  this.y = y;
  this.vx = random(-1,1);
  this.vy = random(-1,1);
  this.size = random(2,6);

  

  

  

  this.update = function() {

      this.x+=this.vx;
      this.y+=this.vy;
      

      if(this.y<0)
      {
        this.vy *=-1
      }
      if(this.y>height)
      {
        this.vy *=-1
      }
      if(this.x<0)
      {
        this.vx *=-1
      }
      if(this.x>width)
      {
        this.vy *=-1
      }

      /*for (var i = particles.length - 1; i >= 0; i--) {

        var dist = sqrt(pow(this.x-particles[i].x,2)+pow(this.y-particles[i].y,2))

        if(dist<this.size && dist>0)
        {
          this.vx = -this.vx
          this.vy = -this.vy
        }
      }*/



      
  };

  this.display = function() {
    noStroke();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size);
  };


}
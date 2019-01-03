var length = 500;
var width = 500;
var particles = [];
var slider;
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  fill(240);
  noStroke();
  slider = createSlider(0, 200, 100);
  slider.position(20, 20);
  

  
  for (var i = 200; i >= 0; i--) {
  	particles.push(new Particle());	
  	
  }
}

function draw() {
  // put drawing code here
  background('black');

  
  


  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].connect();
    

  }
  for (var i = particles.length - 1; i >= 0; i--) {
  	particles[i].update();
  	particles[i].display();
  	

  }
}





function Particle()
{
	this.x = random(0,windowWidth);
	this.y = random(0,windowHeight);
	this.vx = random(-1,1)/10;
	this.vy = random(-1,1)/10;
	this.size = random(2,6);

	

	

	this.connect = function(){
    var max = slider.value();
		for (var i = particles.length - 1; i >= 0; i--) {
			var dist  = sqrt(pow(this.x-particles[i].x,2)+pow(this.y-particles[i].y,2))
			//console.log(dist)
			if(dist < max && dist>0)
			{
				stroke(map(dist,0,max,255,0))
    			line(this.x, this.y, particles[i].x,particles[i].y)

    		}
		}


	}

	this.update = function() {
    	this.x+=this.vx;
    	this.y+=this.vy;
    	

    	if(this.y<0)
    	{
    		this.y = height
    	}
    	if(this.y>height)
    	{
    		this.y = 0
    	}
    	if(this.x<0)
    	{
    		this.x = width
    	}
    	if(this.x>width)
    	{
    		this.y = width
    	}



    	
  };

  this.display = function() {
  	noStroke();
  	fill(255,0,0);
    ellipse(this.x, this.y, this.size);
  };
}
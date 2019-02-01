var bars = []
var y;
var size;
function setup() {
  createCanvas(windowWidth,windowHeight)
  y = 0
  size = 10
}
function mousePressed()
{

  bars.push([mouseX,mouseY,random(100), random(100)])

}

function draw() {
  


  background(255)
  for (var i = 0; i <bars.length; i++) {
    colorMode(HSB,100);
    fill(bars[i][2],100,100);
    rect(bars[i][0],bars[i][1],bars[i][3],10)
  }

}







var arr = [];
var add;
var rem;


function setup() {
 createCanvas(windowWidth, windowHeight);
  add = createButton('Add');
  add.position(10,10);
  add.mousePressed(addition)
  rem = createButton('Remove');
  rem.position(10,70);
  rem.mousePressed(remov)
  
 
}
function addition()
{
	arr.push(random(1))
}
function remov()
{
	arr.pop()
}






function draw() {

 background(0)
 console.log(arr)
 fill(255)
 text(arr,100,100)
}


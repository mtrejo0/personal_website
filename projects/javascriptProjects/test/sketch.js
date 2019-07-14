var img;

function setup() {
 createCanvas(windowWidth, windowHeight);
 img = loadImage("dog.jpg");

}





function draw() {
 
 image(img, 0,0);
 console.log(img.pixels)

}


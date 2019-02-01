var length = 500;
var width = 500;
var items = [];
var n = 250;
var index = 0;
function setup() {
  // put setup code here
  length = windowWidth;
  width = windowHeight;
  createCanvas(windowWidth , windowHeight);
  for (var i = n; i >= 0; i--) {
    items.push(new Bar(i,i/n*windowHeight));
  }

  randomize(items);

  /*def insertion_sort(A):
  #Insertion sort array A
  for i in range(1, len(A)): # O(n) loop over array
    for j in range(i, 0, -1): # O(i) loop over sub-array
      if A[j - 1] <= A[j]: # O(1) check if swap needed
        break # O(1) no swap needed
      A[j - 1], A[j] = A[j], A[j - 1] # O(1) swap*/

    index = 0;

    /*for (var i = 1; i < items.length; i++) {
      for (var j = i; j >0; j--) {
        if(items[j-1].height<=items[j].height)
        {
          break;
        }
        var temp = items[j-1].height;
        items[j-1].height = items[j].height;
        items[j].height = temp;
    }  
  }*/

}





function draw() {
  // put drawing code here
  if(index<items.length)
  {
    for (var j = index; j >0; j--) {
        if(items[j-1].height<=items[j].height)
        {
          break;
        }
        var temp = items[j-1].height;
        items[j-1].height = items[j].height;
        items[j].height = temp;
    }
  }
  index++;
  if(index>=items.length)
  {
    noLoop();
  }
  noStroke();





  background('black');
  for (var i = items.length - 1; i >= 0; i--) {
    items[i].display();
    

  } 
}


function Bar(pos,height)
{
  this.pos = pos;
  this.height = height;

  this.move = function(newPos)
  {
    this.pos = newPos;
  }
  this.display = function ()
  {
    colorMode(HSB,100);
    fill(this.height/500*100,100,100);
    rectMode(CORNERS);
    rect(width/n*this.pos,length, width/n*this.pos+width/n,this.height);
  }


}
function randomize(items)
{
  for (var j = 10; j >= 0; j--) {
    for (var i = items.length - 1; i >= 0; i--) {
        index = int(random(items.length));
        var temp = items[i].height;
        items[i].height = items[index].height;
        items[index].height = temp;
  }
}

}




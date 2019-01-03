var length = 500;
var width = 500;
var items = [];
var n = 250;
var index = 0;
function setup() {
  // put setup code here
  length = windowWidth;
  width = windowHeight;
  createCanvas(windowWidth, windowHeight);
  for (var i = n; i >= 0; i--) {
    items.push(new Bar(i,i/n*windowHeight));
  }
  randomize(items);
  index = items.length-1;

  /*def selection_sort(A):
  #Selection sort array A
  for i in range(len(A) - 1, 0, -1): # O(n) loop over array
    m = i # O(1) initial index of max
    for j in range(i, 0, -1): # O(i) search for max in A[:i]
      if A[m] < A[j]: # O(1) check for larger value
        m = j # O(1) new max found
    A[m], A[i] = A[i], A[m] # O(1) swap*/

    /*for (var i = items.length - 1; i >= 0; i--) {
    var m = i;
    for (var j = i; j >= 0; j--) {
      if(items[m].height<items[j].height)
      {
        m = j;
        
      }
    }
    var temp = items[m].height;
    items[m].height = items[i].height;
    items[i].height = temp;
    
      
  }*/
  


    
  

}




function draw() {
  // put drawing code here

  if(index>=0)
  {
    var m = index;
    for (var j = index; j >= 0; j--) {
      if(items[m].height<items[j].height)
      {
        m = j;
        
      }
    }
    var temp = items[m].height;
    items[m].height = items[index].height;
    items[index].height = temp;
    
    
      
  }
  if(index<0)
  {noLoop();}

  noStroke();
  
  index= index-1;





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




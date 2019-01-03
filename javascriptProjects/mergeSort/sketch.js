var length = 500;
var width = 500;
var items = [];
var n = 250;
var index = 0;
var iterations = [];
function setup() {
  // put setup code here
  length = windowWidth;
  width = windowHeight;
  createCanvas(windowWidth , windowHeight);
  for (var i = n; i >= 0; i--) {
    items.push(new Bar(i,i/n*windowHeight));
  }

  randomize(items);

 
    

  mergeSort(0,0,null);
    

    
}




function mergeSort(l, r, temp)
{
  //console.log(l,r,temp)
  if(temp == null)
  {
    r = items.length;
    temp = [];
    for (var i = items.length - 1; i >= 0; i--) {
      temp.push(null);
    }
  }
  
  if(1<r-l)
  {
    var c = ((l+r+1)/2)|0;
    
    mergeSort(l,c,temp);
    mergeSort(c,r,temp);

    var t  = l;
    var p1 = l;
    var p2 = c;
    while(t != r)
    {
      
      if(p2 == r || (p1<c && items[p1].height<items[p2].height))
      {
        temp[t] = items[p1].height;
        
        p1+=1;
      }
      else
      {
        temp[t] = items[p2].height;
       
        p2+=1;
      }
      t+=1;
      
    }
    for (var i = l; i < r; i++) {
      items[i].height = temp[i];
      
    }
  }
}


function draw() {
  //noStroke();

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




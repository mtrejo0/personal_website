

var items = [];
var n = 150;
var iterations = [];
var time =0;
var index;
var init = [];


function setup() {

  length = windowWidth-15;
  width = windowHeight;

  createCanvas(windowWidth-15 , windowHeight);
  for (var i = n; i >= 0; i--) {
    items.push([i,i/n*windowHeight])
  }

  randomize(items); 

  for (var i = 0; i < items.length; i++) {
    init.push(items[i][1])
  }
  
  index = 0
 
  mergeSort(items,0,0,null);
  


    

    
}




function mergeSort(arr,l, r, temp)
{
  
  if(temp == null)
  {
    r = arr.length;
    temp = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      temp.push(null);
    }
  }
  
  if(1<r-l)
  {
    var c = ((l+r+1)/2)|0;
    
    mergeSort(arr,l,c,temp);
    mergeSort(arr,c,r,temp);

    var t  = l;
    var p1 = l;
    var p2 = c;
    while(t != r)
    {
      
      if(p2 == r || (p1<c && arr[p1][1]<arr[p2][1]))
      {
        temp[t] = arr[p1][1];
        iterations.push(temp.slice())
        
        p1+=1;
      }
      else
      {
        temp[t] = arr[p2][1];
       iterations.push(temp.slice())
        p2+=1;
      }
      t+=1;
      
    }
    for (var i = l; i < r; i++) {
      arr[i][1] = temp[i];
      
      
    }

  }

  return arr;
}


function draw() {
  //noStroke();
    if(index<iterations.length){
      console.log(init)
      background('black');
      temp = iterations[index]
      for (var i = items.length - 1; i >= 0; i--) {
        colorMode(HSB,100);

        if(temp[i]!=null){

          height = temp[i]
        }
        else
        {
          height = init[i]
        }

        pos = items[i][0]
        noStroke()
        fill(height/500*100,100,100);
        rectMode(CORNERS);
        rect(width/n*pos,length, width/n*pos+width/n,height);
      }
  }
  else
  {
    noLoop
  }
  index++;
    
  

}


function randomize(items)
{
  for (var j = 10; j >= 0; j--) {
    for (var i = items.length - 1; i >= 0; i--) {
        indexA = int(random(items.length));
        var temp = items[i][1];
        items[i][1] = items[indexA][1];
        items[indexA][1] = temp;
  }
}


}



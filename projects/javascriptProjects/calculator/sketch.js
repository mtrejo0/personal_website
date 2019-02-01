var input;
var output;

var plusButton;
var minusButton;
var divideButton;
var multiplyButton;

var button;

var numButtons = [];

var numPos = [100,200];
var opPos = [400,200]

var string;

var currNum;

var enterButton;

var back;



function setup() {
  createCanvas(windowWidth,windowHeight );

  

    button = createButton("0");
    button.position(numPos[0],numPos[1])
    button.mousePressed(zero)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("1");
    button.position(numPos[0],numPos[1])
    button.mousePressed(one)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("2");
    button.position(numPos[0],numPos[1])
    button.mousePressed(two)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("3");
    button.position(numPos[0],numPos[1])
    button.mousePressed(three)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("4");
    button.position(numPos[0],numPos[1])
    button.mousePressed(four)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("5");
    button.position(numPos[0],numPos[1])
    button.mousePressed(five)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("6");
    button.position(numPos[0],numPos[1])
    button.mousePressed(six)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("7");
    button.position(numPos[0],numPos[1])
    button.mousePressed(seven)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("8");
    button.position(numPos[0],numPos[1])
    button.mousePressed(eight)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton("9");
    button.position(numPos[0],numPos[1])
    button.mousePressed(nine)
    button.size(40,40)
    numButtons.push(button);
    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }
    button = createButton(".");
    button.position(numPos[0],numPos[1])
    button.mousePressed(decimal)
    button.size(40,40)
    numButtons.push(button);

    numPos[0]+=100;
    if(numPos[0]>300)
    {
      numPos[0]=100;
      numPos[1]+=100;
    }

  string = "";

  

  back = createButton("<=");
  back.position(500,200)
  back.mousePressed(del);
  back.size(40,40)

  plusButton = createButton("+");
  plusButton.position(opPos[0],opPos[1])
  plusButton.mousePressed(plus);
  plusButton.size(40,40)
  opPos[1]+=100
  minusButton = createButton("-");
  minusButton.position(opPos[0],opPos[1])
  minusButton.mousePressed(minus);
  minusButton.size(40,40)
  opPos[1]+=100
  divideButton = createButton("/");
  divideButton.position(opPos[0],opPos[1])
  divideButton.mousePressed(divide);
  divideButton.size(40,40)
  opPos[1]+=100
  multiplyButton = createButton("*");
  multiplyButton.position(opPos[0],opPos[1])
  multiplyButton.mousePressed(multiply);
  multiplyButton.size(40,40)

  enterButton = createButton("=");
  enterButton.position(300,500)
  enterButton.mousePressed(calculate);
  enterButton.size(40,40)


}

function calculate()
{
  var ans = 0;
  var nums = [""];
  var ops = [];
  
  var numI = 0;

  for (var i = 0; i < string.length ; i++) {

    if(string[i] != "+" && string[i] != "-" &&string[i] != "/" &&string[i] != "*" )
    {
      nums[numI]+=string[i];
    }
    else
    {
      if(i==0 && string[i] == "-")
      {
        nums[numI]+=string[i];
      }
      else if(i !==0 && string[i] == "-" && (string[i-1] == "+" || string[i-1] == "-" ||string[i-1] == "/" ||string[i-1] == "*" ))
      {
        nums[numI]+=string[i];
      }
      
      else
      {
      ops.push(string[i]);
      numI++;
      nums.push("");
    }
    }
  } 

  

  for (var i = nums.length - 1; i >= 0; i--) {
    nums[i] = parseFloat(nums[i],10);
  }
  console.log(nums,ops);
  var i = 1;
  var ans = parseFloat(nums[0],10)
  while(i<nums.length)
  {
    if(ops[i-1] == "+")
    {
      ans+=parseFloat(nums[i],10)
    }
    if(ops[i-1] == "-")
    {
      ans-=parseFloat(nums[i],10)
    }
    if(ops[i-1] == "/")
    {
      ans/=parseFloat(nums[i],10)
    }
    if(ops[i-1] == "*")
    {
      ans*=parseFloat(nums[i],10)
    }
    i++;
  }


  string = ans.toString()
  

  
}

function decimal()
{
  string +=".";
}
function del()
{
  string = string.substring(0,string.length-1);
}
function zero()
{
  string+="0";
}
function one()
{
  string+="1";
}
function two()
{
  string+="2";
}
function three()
{
  string+="3";
}
function four()
{
  string+="4";
}
function five()
{
  string+="5";
}
function six()
{
  string+="6";
}
function seven()
{
  string+="7";
}
function eight()
{
  string+="8";
}
function nine()
{
  string+="9";
}
function plus()
{
  string+="+";
}
function minus()
{
  string+="-";
}
function divide()
{
  string+="/";
}
function multiply()
{
  string+="*";
}




function draw()
{
  background(0);
  fill("white ")
  rectMode(CORNERS);
  rect(50,50,750,150)

  fill("black");
  textSize(30);
  text(string,75,100);



  
}


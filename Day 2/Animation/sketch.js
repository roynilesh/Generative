let x;
let y;
function setup() {
  createCanvas(400, 400);
  x = 0
  y = 400
}

function draw() {
  background(220);
 /* //L to R
  fill(x,y,200,100)
  ellipse(x,200,x/2) // x/2 changes scale. Assumes L and B as the same value
  x = x + 5;

  //R to L
  fill(y,x,x/2)
ellipse(y,y/2,100)
y = y - 5
*/
fill(mouseX,mouseY,x/2)
ellipse(mouseX, mouseY, 100)
}
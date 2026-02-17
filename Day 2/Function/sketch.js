function setup() {
  createCanvas(400, 400);
  background(91,91,20);
  frameRate(100)
}

function draw() {

}
function drawBoat(x,y,) {
rect(x,y,120,50,0,0,35,35);

triangle(x+20,y-10,x+70,y-10,x+70,y-50);

}

function mousePressed() {
  drawBoat(mouseX,mouseY);
}

function mouseDragged() {
  drawBoat(mouseX,mouseY);
}
function setup() {
  createCanvas(500, 500);
}

function draw() {
  rectMode(CORNER);
  background(52, 168, 235);
  fill(196, 189, 159)
  circle(100,250,100,200);  //ears
  fill(196, 189, 159)
  circle(400,250,100,200);
  fill(255, 244, 196)
  rect(100,100,300,300,50)//face
  noStroke();
  fill(196, 189, 159) //eyeshadow
  circle(175,250,100)
  circle(325,250,100)
  fill(255, 255, 255) //eyes
  circle(175,250,80,80)
  circle(325,250,80,80)
  fill(8, 8, 8) //pupil
  circle(175,250,mouseX/10)
  circle(325,250,mouseX/10)
  fill(255, 201, 201) //nose
  rect(235,210,30,112,50)
  fill(30,30,30)  //eyebrows
  rect(120,170,260,25)

  rectMode(CENTER);
  fill(196, 189, 159)
  rect(100,330,mouseY,25,50) //mouth
  fill(158, 103, 103)
  rect(102,340,-20+mouseY,5,50)  //mouth
}
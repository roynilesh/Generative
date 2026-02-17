function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(52, 168, 235);
  fill(196, 189, 159)
  circle(100,250,100,200);  //ears
  fill(196, 189, 159)
  circle(400,250,100,200);
  fill(255, 244, 196)
  rect(100,100,300,300,50)//face
  noStroke();
  fill(196, 189, 159) //eyeshadow
  circle(175,250,100,100)
  circle(325,250,100,100)
  fill(255, 255, 255) //eyes
  circle(175,250,80,80)
  circle(325,250,80,80)
  fill(8, 8, 8)
  circle(175,250,20,20)
  circle(325,250,20,20) 
  fill(255, 201, 201)
  rect(235,210,30,112,50)//nose
  fill(30,30,30)
  rect(120,180,260,25)//eyebrows
  fill(196, 189, 159)
  rect(160,330,175,25,50)//mouth
  fill(158, 103, 103)
  rect(170,340,150,5,50)//mouth
}
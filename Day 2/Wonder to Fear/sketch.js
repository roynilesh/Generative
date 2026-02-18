function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(30, 32, 71);


  fill(178, 181, 237)
  noStroke()
  circle(width/2,height/2,100)

  fill(178, 181, 237,50)
  
  circle(width/2,height/2,150)

  fill(251, 207, 255,50)
 
  triangle(0,height,width/2,height/2,200,width)

  fill(251, 207, 255,50)
  triangle(0,0,width/2,height/2,0,100)

  fill(251, 207, 255,50)
  triangle(500,150,width/2,height/2,500,350)

}

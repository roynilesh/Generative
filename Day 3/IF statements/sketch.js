function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(160,30,80);
  noStroke();
  /*
  // change ellipse colour in 3 parts
  if(mouseX<width/3) {
    
    ellipse(mouseX, mouseY, 50); 
  } else if(mouseX>width/2) {
    fill(120,200,20);  
    ellipse(mouseX, mouseY, 50); 
  } else {
    fill(200,120,30);  
    ellipse(mouseX, mouseY, 50); 
  }
  */

  // change ellipse colour in each quadrant
  //top left
  if(mouseX < width/2 && mouseY<height/2) {
    fill(120,120,200);  
  }
  //top right
  else if(mouseX >= width/2 && mouseY < height/2) {
    fill(120,200,20); 
  }
  //bottom left
  else if(mouseX < width/2 && mouseY >= height/2) {
    fill(200,120,30);
  } 
  //bittom right
  else {
    fill(255);
  }


  ellipse(mouseX, mouseY, 50);

}
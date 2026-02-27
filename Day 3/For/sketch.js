let gSize = 50
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0)
}

function draw() {
frameRate(25)
  for(let x = 0 ;  x<innerWidth ; x+=gSize) {
    for(let y = 0; y< innerHeight ; y += gSize) {
      fill(random(255), random(255), random(255));
      noStroke();
      textSize(50)
      text("lol",x,y);
      
    }
  }

}

let gSize = 75;
let colours = ["#8A7650","8E977D","ECE7D1","ECE7D1","DBCEA5"]

let gridImages = [];

function preload(){
  gridImages[0] = loadImage("./Patterns-01.png")
  gridImages[1] = loadImage("./Patterns-02.png")
  gridImages[2] = loadImage("./Patterns-03.png")
  gridImages[3] = loadImage("./Patterns-04.png")
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(5);
  }

function draw() {
  background(97, 181, 250);

  for(let i = 0 ;  i<width ; i+=gSize) {
    for(let j = 0; j<height ; j += gSize) {
      let choice = floor(random(0,gridImages.length));
      image(gridImages[choice],i,j,gSize,gSize);
    }
  }

}

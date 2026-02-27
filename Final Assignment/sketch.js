// Hand Pose - Mudra Animations with Combinations

let video;
let handPose;
let hands = [];
let activeMudras = []; // holds all currently detected mudras across both hands
let animTime = 0;
let animScale = 1;



const MUDRA_THEMES = {
  gyan: { primary: [148, 0, 211], secondary: [75, 0, 130] },  // violet
  shuni: { primary: [0, 150, 255], secondary: [0, 80, 200] },  // blue
  surya: { primary: [255, 140, 0], secondary: [255, 60, 0] },  // orange/gold
};

function getHandDistance() {
  if (hands.length < 2) return null;

  let wrist0 = hands[0].keypoints[0]; // wrist of first hand
  let wrist1 = hands[1].keypoints[0]; // wrist of second hand

  return dist(wrist0.x, wrist0.y, wrist1.x, wrist1.y);

}
function gotHands(results) {
  hands = results;
}

function mousePressed() {
  console.log(hands);
}

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
  angleMode(RADIANS);
}

// ─── Mudra Detection ─────────────────────────────────────────────────────────

function detectMudra(hand) {
  let thumb = hand.thumb_tip;
  let index = hand.index_finger_tip;
  let middle = hand.middle_finger_tip;
  let ring = hand.ring_finger_tip;
  let pinky = hand.pinky_finger_tip;

  let ti = dist(thumb.x, thumb.y, index.x, index.y);
  let tm = dist(thumb.x, thumb.y, middle.x, middle.y);
  let tr = dist(thumb.x, thumb.y, ring.x, ring.y);
  let tp = dist(thumb.x, thumb.y, pinky.x, pinky.y);

  const TOUCH = 40;
  const OPEN = 80;

  if (ti < TOUCH && tm > OPEN && tr > OPEN && tp > OPEN) return "gyan";
  if (tm < TOUCH && ti > OPEN && tr > OPEN && tp > OPEN) return "shuni";
  if (tr < TOUCH && ti > OPEN && tm > OPEN && tp > OPEN) return "surya";

  return null;
}

// Helper — returns the current combo key if two mudras are active, else null
function getComboKey() {
  if (activeMudras.length < 2) return null;
  let sorted = [...activeMudras].sort(); // sort so order doesn't matter
  return sorted.join("+");
}

// ─── Single Mudra Animations ──────────────────────────────────────────────────

function drawGyan(t, alpha = 255) {
  let cx = width / 2;
  let cy = height / 2;
  let [r, g, b] = MUDRA_THEMES.gyan.primary;
  let [r2, g2, b2] = MUDRA_THEMES.gyan.secondary;

  noFill();
  for (let i = 0; i < 6; i++) {
    let offset = (t * 80 + i * 80) % 300;
    let a = map(offset, 0, 300, alpha, 0);
    stroke(r, g, b, a);
    strokeWeight(2);
    ellipse(cx, cy, offset * 2, offset * 2);
  }

  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12) * i + t * 1.5;
    let len = 100 + sin(t * 3 + i) * 30;
    let x = cx + cos(angle) * len;
    let y = cy + sin(angle) * len;
    let a = (150 + sin(t * 2 + i) * 100) * (alpha / 255);
    stroke(r2, g2, b2, a);
    strokeWeight(1.5);
    line(cx, cy, x, y);
  }

  noStroke();
  for (let radius = 40; radius > 0; radius -= 5) {
    let a = map(radius, 0, 40, alpha, 0);
    fill(r, g, b, a);
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

function drawShuni(t, alpha = 255) {
  let cx = width / 2;
  let cy = height / 2;
  let [r, g, b] = MUDRA_THEMES.shuni.primary;
  let [r2, g2, b2] = MUDRA_THEMES.shuni.secondary;

  noFill();
  for (let ring = 0; ring < 5; ring++) {
    let baseR = 60 + ring * 50;
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.05) {
      let wobble = sin(a * 6 + t * 2 + ring) * 12;
      let r_ = baseR + wobble;
      let x = cx + cos(a) * r_;
      let y = cy + sin(a) * r_;
      let opacity = (180 - ring * 25) * (alpha / 255);
      stroke(r, g, b, opacity);
      strokeWeight(1.5);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  for (let i = 0; i < 4; i++) {
    let offset = (t * 60 + i * 70) % 280;
    let a = map(offset, 0, 280, 220 * (alpha / 255), 0);
    stroke(r2, g2, b2, a);
    strokeWeight(3);
    noFill();
    ellipse(cx, cy, offset * 2, offset * 2);
  }

  noStroke();
  for (let radius = 35; radius > 0; radius -= 4) {
    let a = map(radius, 0, 35, alpha, 0);
    fill(r, g, b, a);
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

function drawSurya(t, alpha = 255) {
  let cx = width / 2;
  let cy = height / 2;
  let [r, g, b] = MUDRA_THEMES.surya.primary;
  let [r2, g2, b2] = MUDRA_THEMES.surya.secondary;

  for (let i = 0; i < 8; i++) {
    let angle = (TWO_PI / 8) * i + t * 2;
    let len = 120 + sin(t * 4 + i * 0.8) * 40;
    let x = cx + cos(angle) * len;
    let y = cy + sin(angle) * len;
    let a = (180 + sin(t * 3 + i) * 70) * (alpha / 255);
    stroke(r, g, b, a);
    strokeWeight(2.5);
    line(cx, cy, x, y);
  }

  noFill();
  for (let i = 0; i < 5; i++) {
    let offset = (t * 70 + i * 60) % 260;
    let a = map(offset, 0, 260, 200 * (alpha / 255), 0);
    stroke(r2, g2, b2, a);
    strokeWeight(2);
    ellipse(cx, cy, offset * 2, offset * 2);
  }

  noFill();
  stroke(r, g, b, (120 + sin(t * 5) * 80) * (alpha / 255));
  strokeWeight(4);
  ellipse(cx, cy, 260 + sin(t * 3) * 20, 260 + sin(t * 3) * 20);

  noStroke();
  for (let radius = 45; radius > 0; radius -= 5) {
    let a = map(radius, 0, 45, alpha, 0);
    fill(r, g, b, a);
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

// ─── Combined Animations ──────────────────────────────────────────────────────

// Gyan + Shuni — violet rings interweave with blue waves, shared rotating mandala
function drawGyanShuni(t) {
  let cx = width / 2;
  let cy = height / 2;

  background(5, 5, 40, 200);

  // Draw both base animations at half opacity so they blend
  drawGyan(t, 140);
  drawShuni(t * 1.2, 140); // slightly different speed so they feel distinct

  // Unique combined element — dual colour rotating mandala petals
  for (let i = 0; i < 16; i++) {
    let angle = (TWO_PI / 16) * i + t;
    let len = 140 + sin(t * 2 + i) * 20;
    let x = cx + cos(angle) * len;
    let y = cy + sin(angle) * len;

    // Alternate between violet and blue per petal
    let col = i % 2 === 0
      ? MUDRA_THEMES.gyan.primary
      : MUDRA_THEMES.shuni.primary;

    stroke(col[0], col[1], col[2], 200);
    strokeWeight(1);
    noFill();
    ellipse(x, y, 20, 20);
    line(cx, cy, x, y);
  }

  // Shared central orb blending both colours
  noStroke();
  for (let radius = 50; radius > 0; radius -= 4) {
    let blend = map(radius, 0, 50, 0, 1);
    let r_ = lerp(148, 0, blend);
    let g_ = lerp(0, 150, blend);
    let b_ = lerp(211, 255, blend);
    fill(r_, g_, b_, map(radius, 0, 50, 255, 0));
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

// Gyan + Surya — violet and gold collide in a spinning geometric star burst
function drawGyanSurya(t) {
  let cx = width / 2;
  let cy = height / 2;

  background(25, 0, 25, 200);

  drawGyan(t * 0.8, 130);
  drawSurya(t * 1.1, 130);

  // Unique combined element — alternating violet/gold star points
  for (let i = 0; i < 20; i++) {
    let angle = (TWO_PI / 20) * i + t * 1.5;
    let inner = 60 + sin(t * 3) * 10;
    let outer = 180 + sin(t * 2 + i) * 25;

    let x1 = cx + cos(angle) * inner;
    let y1 = cy + sin(angle) * inner;
    let x2 = cx + cos(angle) * outer;
    let y2 = cy + sin(angle) * outer;

    let col = i % 2 === 0
      ? MUDRA_THEMES.gyan.primary
      : MUDRA_THEMES.surya.primary;

    stroke(col[0], col[1], col[2], 180 + sin(t * 4 + i) * 70);
    strokeWeight(2);
    line(x1, y1, x2, y2);
  }

  // Shared central orb blending violet to gold
  noStroke();
  for (let radius = 55; radius > 0; radius -= 4) {
    let blend = map(radius, 0, 55, 0, 1);
    let r_ = lerp(148, 255, blend);
    let g_ = lerp(0, 140, blend);
    let b_ = lerp(211, 0, blend);
    fill(r_, g_, b_, map(radius, 0, 55, 255, 0));
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

// Shuni + Surya — blue waves and solar fire spiral outward together
function drawShuniSurya(t) {
  let cx = width / 2;
  let cy = height / 2;

  background(0, 15, 30, 200);

  drawShuni(t, 130);
  drawSurya(t * 0.9, 130);

  // Unique combined element — double spiral arms, one blue one gold
  for (let arm = 0; arm < 2; arm++) {
    let armOffset = arm * PI;
    for (let i = 0; i < 60; i++) {
      let angle = (i * 0.2) + t * 1.5 + armOffset;
      let radius = i * 3.5;
      let x = cx + cos(angle) * radius;
      let y = cy + sin(angle) * radius;
      let col = arm === 0
        ? MUDRA_THEMES.shuni.primary
        : MUDRA_THEMES.surya.primary;
      let a = map(i, 0, 60, 220, 0);
      fill(col[0], col[1], col[2], a);
      noStroke();
      ellipse(x, y, 6, 6);
    }
  }

  // Shared central orb blending blue to orange
  noStroke();
  for (let radius = 50; radius > 0; radius -= 4) {
    let blend = map(radius, 0, 50, 0, 1);
    let r_ = lerp(0, 255, blend);
    let g_ = lerp(150, 140, blend);
    let b_ = lerp(255, 0, blend);
    fill(r_, g_, b_, map(radius, 0, 50, 255, 0));
    ellipse(cx, cy, radius * 2, radius * 2);
  }
}

// ─── Main Loop ────────────────────────────────────────────────────────────────

function draw() {
  image(video, 0, 0, width, height);
  let handDist = getHandDistance();

if (handDist !== null) {
  // Map hand distance (50px = close, 600px = far apart) to scale (0.3 to 2.0)
  let targetScale = map(handDist, 50, 600, 0.3, 2.0, true);
  animScale = lerp(animScale, targetScale, 0.1); // 0.1 = smooth easing
}

  // Collect all mudras detected this frame, one per hand
  activeMudras = [];
  for (let hand of hands) {
    let detected = detectMudra(hand);
    if (detected && !activeMudras.includes(detected)) {
      activeMudras.push(detected);
    }
  }

  let combo = getComboKey();

  if (activeMudras.length > 0) {
    animTime += 0.03;

// Apply scale transform around canvas centre
    push();
    translate(width / 2, height / 2);
    scale(animScale);
    translate(-width / 2, -height / 2);

    if      (combo === "gyan+shuni")  drawGyanShuni(animTime);
    else if (combo === "gyan+surya")  drawGyanSurya(animTime);
    else if (combo === "shuni+surya") drawShuniSurya(animTime);
    else if (activeMudras.includes("gyan")) {
      background(10, 0, 30, 180);
      drawGyan(animTime);
    }
    else if (activeMudras.includes("shuni")) {
      background(0, 10, 40, 180);
      drawShuni(animTime);
    }
    else if (activeMudras.includes("surya")) {
      background(40, 10, 0, 180);
      drawSurya(animTime);
    }

    pop();

    // Label
    fill(255);
    noStroke();
    textSize(20);
    textAlign(CENTER);
    let label = combo
      ? combo.toUpperCase().replace("+", " + ") + " MUDRA"
      : activeMudras[0].toUpperCase() + " MUDRA";
    text(label, width / 2, height - 20);

  } else {

  }
}

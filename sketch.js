// modified from https://kylemcdonald.github.io/cv-examples/

var capture;
var screenW = 1920;
var screenH = 1080;

var brightest;

let b = 1;
let c = 1;

var vel = 0;
var r, g, h, i, j, e, f, k, l;

//caves cabinet exist to pull random files from
let caves = [];
let numCaves = 5;

function preload() {
  //preload pictures of cave into code
  img1 = loadImage("Altamira.jpg");
  img2 = loadImage("Kakadu.jpg");
  img3 = loadImage("Lascaux.jpg");
  img4 = loadImage("Manos.jpg");
  img5 = loadImage("Pettakere.jpg");
  bg = loadImage("background.jpg");

  let cave1 = img1;
  let cave2 = img2;
  let cave3 = img3;
  let cave4 = img4;
  let cave5 = img5;

  caves = [cave1, cave2, cave3, cave4, cave5];
}

function setup() {
  //make computer sized screen
  createCanvas(screenW, screenH);

  //setup screen capture
  capture = createCapture(
    {
      audio: false,
      video: {
        width: screenW,
        height: screenH,
      },
    },
    function () {
      console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.size(screenW, screenH);
  createCanvas(screenW, screenH);
  capture.hide();

  //set imagemode
  imageMode(CENTER);

  //assign newCursor to call the moving light for the mouse
  newCursor = new light();

  //assign circles for interaction effect
  circ1 = new circles();
  circ2 = new circles();
  circ3 = new circles();
  circ4 = new circles();
  circ5 = new circles();
  circ6 = new circles();
}

//finds the brightest point in the screen capture
function findBrightest(video) {
  var brightestValue = 0;
  var brightestPosition = createVector(0, 0);
  var pixels = video.pixels;
  var i = 0;
  for (var y = 0; y < screenH; y++) {
    for (var x = 0; x < screenW; x++) {
      var r = pixels[i++];
      var g = pixels[i++];
      var b = pixels[i++];
      i++; // ignore a
      var brightness = r + g + b;
      if (brightness > brightestValue) {
        brightestValue = brightness;
        brightestPosition.set(x, y);
      }
    }
  }
  return brightestPosition;
}



function draw() {
  print(mouseX, mouseY);

  //not using - delete?
  //let randomCaves = random(caves);

  //set background image
  image(bg, width/2, height/2, screenW, screenH);

  //screen capture
  //show semi-transparent screen capture  for testing
  push();
  //tint(255, 20);
  //flip image
  scale(-1, 1);
  image(capture, width / 2, height / 2, screenW, screenH);
  
  //load pixels of screen capture and look for brightest point
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    // don't forget this!
    brightest = findBrightest(capture);
    
    //draw ellipse at brightest point
    var radius = 10;
    fill(255, 0, 0);
    ellipse(brightest.x, brightest.y, radius, radius);
  }
  pop();

  //don't show cursor
  noCursor();
  noFill();

  //initiate interaction
  interaction();
}

function interaction() {
  let randomCaves = random(caves);

  //fill so you can see where the interaction points are
  //fill(200);
  noStroke();
  circ6.display(800, 200);
  circ5.display(750, 550);
  circ4.display(350, 520);
  circ3.display(350, 125);
  circ2.display(200, 300);

  //it looks like you replaced circ1 with newCursor? - delete
  //circ1.display(mouseX, mouseY);

  //the user's cursor or "flashlight"
  //Hannah, instead use "brightest point" variables
  newCursor.display(brightest.x, brightest.y);
  //newCursor.display(mouseX, mouseY);
  

  textAlign(CENTER);
  fill(224, 237, 38);
  stroke(0);
  strokeWeight(4);
  textSize(24);
  textStyle(BOLD);
  textWrap(WORD);
  text("Use the flashlight on the table to find the cave paintings! There are five total!", width / 2-200, height / 2, 400);

  //variables for the distance between the cursor and the connection point
  var j = dist(circ2.x, circ2.y, newCursor.x, newCursor.y);
  var i = dist(circ3.x, circ3.y, newCursor.x, newCursor.y);
  var h = dist(circ4.x, circ4.y, newCursor.x, newCursor.y);
  var k = dist(circ5.x, circ5.y, newCursor.x, newCursor.y);
  var l = dist(circ6.x, circ6.y, newCursor.x, newCursor.y);

  //if conditions are met, a different painting is shown each time
  if (j < circ1.r + circ2.r) {
    image(img1, width / 2, height / 2, width / 2, height / 2);
    textAlign(CENTER);
    fill(224, 237, 38);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    text("Altamira Caves in Altamira, Spain", width / 2, height / 2 - 250);
    textWrap(WORD);
    text(
      "These paintings are between 14,000-18,000 years old. Most of the drawings depict animals from the time period.",
      width / 2 - 250,
      height / 2 + 240,
      500,
      350
    );
  } else if (i < circ1.r + circ3.r) {
    image(img2, width / 2, height / 2, width / 2, height / 2);
    textAlign(CENTER);
    fill(224, 237, 38);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    text("Kakadu National Park in Australia", width / 2, height / 2 - 250);
    textWrap(WORD);
    text(
      "These paintings range the most in age as some aboriginal life continues to draw rock art throughout the area. The oldest is thought to be 20,000 years old.",
      width / 2 - 250,
      height / 2 + 240,
      500,
      350
    );
  } else if (h < circ1.r + circ4.r) {
    image(img3, width / 2, height / 2, width / 2, height / 2);
    textAlign(CENTER);
    fill(224, 237, 38);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    text("Lascaux Caves in Montignac, France", width / 2, height / 2 - 250);
    textWrap(WORD);
    text(
      "These paintings are between 15000-17000 years old. These paintings are unique because they depicted movement of animals unlike the others by drawing multiple sets of legs on animals and humans.",
      width / 2 - 350,
      height / 2 + 240,
      700,
      350
    );
  } else if (k < circ1.r + circ5.r) {
    image(img4, width / 2, height / 2, width / 2, height / 2);
    textAlign(CENTER);
    fill(224, 237, 38);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    text(
      "Cueva de los Manos in Santa Cruz Province, Argentina",
      width / 2,
      height / 2 - 250
    );
    textWrap(WORD);
    text(
      "These paintings are some of the youngest, made between 1,300-9,300 years ago. ",
      width / 2 - 250,
      height / 2 + 240,
      500,
      350
    );
  } else if (l < circ1.r + circ6.r) {
    image(img5, width / 2, height / 2, width / 2, height / 2);
    textAlign(CENTER);
    fill(224, 237, 38);
    stroke(0);
    strokeWeight(4);
    textSize(24);
    textStyle(BOLD);
    text("Pettakere Cave in Sulawesi, Indonesia", width / 2, height / 2 - 250);
    textWrap(WORD);
    text(
      "They are thought to be over 40,000 years old. Most of them are hand stencils. They is also the oldest diction of an animal which looks like a warty pig.",
      width / 2 - 250,
      height / 2 + 240,
      500,
      350
    );
  }
}

//interactive cursor
function light() {
  this.r = 50;
  this.col = 255;

  this.display = function (x, y) {
    this.x = x;
    this.y = y;

    fill(240, 242, 179, 80);
    ellipse(this.x, this.y, 80, 80);
    fill(240, 242, 179, 50);
    ellipse(this.x, this.y, 70, 70);
  };
}

//interaction points
function circles() {
  noFill();
  noStroke();
  this.r = 35;

  this.display = function (x, y) {
    this.x = x;
    this.y = y;

    ellipse(this.x + 10, this.y + 10, this.r * 2);
  };
}

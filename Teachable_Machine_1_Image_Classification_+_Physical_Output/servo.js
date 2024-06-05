let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/25lPyN_lh/';
let port;
let connectBtn;
let value = 0;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(0);
  image(video, 0, 0, width, 480);

  if (label == "white" && confidence > 0.5) {
    value = 90;
    port.write(90 + '\n');
  } else if (label == "blue" && confidence > 0.5) {
    value; ue = 180;
    port.write(180 + '\n');
  } else if (label == "Class 4"&& confidence > 0.5) {
    //don't display any image
    value = 0;
    port.write(0 + '\n');
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);

  if (frameCount % 10 == 0) {
    port.write(value + '\n'); //finish with a newline character for Arduino recieving

  }

  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 115200);
  } else {
    port.close();
  }
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}

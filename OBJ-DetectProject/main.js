// Define an empty variable for storing the status of the cocossd model
let status;

// p5.js setup() function
function setup() {
  // Create canvas and center it on the screen
  const canvas = createCanvas(640, 480);
  canvas.center();

  // Access the webcam, set size, and hide extra components
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

// start() function
function start() {
  // Load the cocossd model
  cocossd = ml5.objectDetector('cocossd', modelLoaded);

  // Update the HTML element with the status of the cocossd model
  document.getElementById('status').innerText = 'Status: Detecting Objects';

  // Get value from the input box and store it in a variable
  const inputValue = document.getElementById('inputBox').value;
}

// modelLoaded() function
function modelLoaded() {
  // Print "model loaded" on the console
  console.log('model loaded');

  // Set the status variable of the model as true
  status = true;
}

// p5.js draw() function
function draw() {
  // Place the webcam live on the canvas
  image(video, 0, 0, width, height);
}

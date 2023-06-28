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

// Define gotResult() function
function gotResult(error, results) {
    // Fetch results from the model
    if (error) {
      console.error(error);
    } else {
      // Assign results array to the defined array
      resultsArray = results;
    }
  }
  
  // Define an empty array to store results
  let resultsArray = [];
  
  // p5.js draw() function
  function draw() {
    // Check if the model status is not empty
    if (status) {
      // Loop through the objects array
      for (let i = 0; i < resultsArray.length; i++) {
        const object = resultsArray[i];
        // Fetch confidence and convert it to percentage
        const confidence = Math.round(object.confidence * 100);
  
        // Fetch label
        const label = object.label;
  
        // Fetch x and y coordinates
        const x = object.x;
        const y = object.y;
  
        // Place label and confidence near the object
        text(label + ": " + confidence + "%", x + 10, y + 20);
  
        // Fetch width, height, x, and y coordinates and draw a rectangle
        const width = object.width;
        const height = object.height;
        rect(x, y, width, height);
  
        // Check if the label matches the object mentioned
        if (label === objectMentioned) {
          // Stop the webcam live view
          video.stop();
  
          // Stop the execution of the cocossd model
          cocossd.dispose();
  
          // Update the HTML element with the status of the object found
          document.getElementById('status').innerText = 'Object mentioned found';
  
          // Use SpeechSynthesisUtterance for text-to-speech
          const utterThis = new SpeechSynthesisUtterance('Object mentioned found');
          speechSynthesis.speak(utterThis);
        }
      }
    } else {
      // Update the HTML element with the status of the object not found
      document.getElementById('status').innerText = 'Object mentioned not found';
    }
  }
  
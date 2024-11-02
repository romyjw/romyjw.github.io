// Function to check the time
function checkTimeForEggScript() {
    const currentDate = new Date();
    const currentMinute = currentDate.getMinutes();
    
    // Check if it's 12 minutes past the hour
     if ( currentMinute === 12) {
        triggerEggScript(); // Trigger egg.js when it's 12 minutes past
    }
    
}

// Add event listener for keydown events
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);


let pressedKeys = new Set();

// Function to handle key presses
function handleKeyPress(event) {

    //console.log(pressedKeys);
    
    //if (!isAnimating && (event.key.toLowerCase() === 'f' )){ //
        
    //    triggerEggScript(); // trigger egg.js
    // }
    
    pressedKeys.add(event.key.toLowerCase());
    
    if (!isAnimating && pressedKeys.has('r') && pressedKeys.has('w') ) {
        triggerEggScript();
    }
    
    
}


// Function to handle key releases
function handleKeyRelease(event) {
    //console.log(pressedKeys);
    pressedKeys.delete(event.key.toLowerCase()); // Remove the key from the set
}


////////////////////////////////////// mobile trigger ////////////////////////////////////


const shakeThreshold = 20000;
    let lastUpdateTime = 0;
    let lastX = 0, lastY = 0, lastZ = 0;

    function detectShake(event) {
       
      const acceleration = event.accelerationIncludingGravity;

      if (!acceleration) return;

      const currentTime = new Date().getTime();
      if ((currentTime - lastUpdateTime) > 1) {
        const deltaTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        const deltaX = acceleration.x ;
        const deltaY = acceleration.y ;
        const deltaZ = acceleration.z ;

        const shakeMagnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ) / deltaTime * 10000;
        
        if (shakeMagnitude > shakeThreshold) {
            //alert(shakeMagnitude);
          //document.getElementById('status').textContent = 'Shake detected!';
          //alert("Shake event triggered!");
          if (!isAnimating) {triggerEggScript();}
        }

        //lastX = acceleration.x;
        //lastY = acceleration.y;
        //lastZ = acceleration.z;
      }
    }

    // Add event listener for device motion
    window.addEventListener('devicemotion', detectShake);



function requestMotionPermission() {
    // Check if the device supports motion permission request (iOS 13+)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    // Permission granted, add the event listener for shake detection
                    window.addEventListener('devicemotion', detectShake);
                } else {
                    console.log("Motion permission denied.");
                }
            })
            .catch(console.error);
    } else {
        // Non-iOS or older iOS devices, add the event listener directly
        window.addEventListener('devicemotion', detectShake);
    }
}

// Call the function to request permission on page load
window.addEventListener('load', requestMotionPermission);






// Function to handle mouse click
// function handleMouseClick(event) {
//    console.log('Mouse clicked at coordinates:', event.clientX, event.clientY);    
//   triggerEggScript(); // Trigger egg.js when mouse clicked
// }


// Function to trigger the egg.js script
function triggerEggScript() {
    
    console.log(" Triggering egg.js...");
    
    // Assuming egg.js is already included, trigger any specific functionality here
    isAnimating = true; // Flag to control animation loop
    W1X = -300;
    draw(); 
}






// Add event listener for mouse click on the entire document
// document.addEventListener('click', handleMouseClick);




// Check every minute to see if it's 20 minutes past the hour
setInterval(checkTimeForEggScript, 10000); // Check every 10 seconds

// Optionally, check immediately on page load
checkTimeForEggScript();




const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Set canvas width and height to full window size
canvas.width = window.innerWidth - 20;  // Full width of the window

//let init_canvas_width = canvas.width


canvas.height = 65; // Set a fixed height or adjust as needed




const scaleFactor = 0.3 ; // Change this value to scale up or down



 //You can also set up an event listener to handle window resize
// window.addEventListener('resize', () => {
    // scaleFactor = 0.3 * canvas.width / init_canvas_width;
    //canvas.height = 0.065 * canvas.width / scaleFactor;
//    canvas.width = 1000;
 // });



const pi = Math.PI;
let WR = 50;  // Wheel radius
let W1X = -200;
let Y = canvas.height + 100;
let b = 0;
let speed = pi * 2 * WR * 0.02;
let spokeRotationSpeed = pi/45
let pedalRotationSpeed = spokeRotationSpeed / 1
let spokeRotationAngle = 0; // Angle to rotate the spokes

// Spokes for the wheels - adding spoke rotation
let spokeCount = 16;
let spokeAngleIncrement = (2 * pi) / spokeCount; // Angle between spokes

const COLOUR1 = 'rgb(250, 57, 22)'; //red-orange

// const COLOUR3 = 'rgb(150, 150, 150)'; // pale grey
const COLOUR3 = 'rgb(64,64,64)'; // dark grey
const COLOUR2 = 'rgb(0, 0, 0)';

let isAnimating = false; // Flag to control animation loop

ctx.scale(scaleFactor, scaleFactor); // Scale the context


function draw() {
    //scaleFactor = 0.3 * canvas.width / 1000;
    
    if (!isAnimating) return; // Stop drawing if animation is turned off


    ctx.clearRect(0, 0, 100000, 100000);  // Clear the canvas

    ctx.save(); // Save the current state
    
    
    
    
    

    // Increment the wheel position
    W1X += speed;
    
    if (W1X > (canvas.width/ scaleFactor + 500) ) {
        isAnimating = false;
        W1X = -200;  // Reset to left of window
        return;
    }
    
    
    let W2X = W1X + 150;

    // Pedal positions
    let pedal1X = (30 * Math.cos(b)) + W1X + 75;
    let pedal2X = (30 * Math.cos(b + pi)) + W1X + 75;
    let pedal1Y = (30 * Math.sin(b)) + Y;
    let pedal2Y = (30 * Math.sin(b + pi)) + Y;
    pedal2X -= 8;

    // Bicycle seat and other components
    let seatx = W1X + 45;
    let seaty = Y - 68;
    let len = 30;



    // legs
    // find next knee position
    
    let m1 = (seaty - pedal1Y) / (seatx - pedal1X);
    m1 = -1 / m1;
    let x1 = (seatx + pedal1X) / 2;
    let y1 = (seaty + pedal1Y) / 2;
    
    let k1x = x1, k1y = y1;
    while (((k1x - x1) ** 2 + (k1y - y1) ** 2) <= len ** 2) {
        k1x++;
        k1y += m1;
    }
    ctx.beginPath();
    ctx.moveTo(seatx, seaty);
    ctx.lineTo(k1x, k1y);
    ctx.lineTo(pedal1X - 8, pedal1Y);
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
    let m = (seaty - pedal2Y) / (seatx - pedal2X);
    m = -1 / m;
    let x = (seatx + pedal2X) / 2;
    let y = (seaty + pedal2Y) / 2;
    
    
    let k2x = x, k2y = y;
    while (((k2x - x) ** 2 + (k2y - y) ** 2) <= len ** 2) {
        k2x++;
        k2y += m;
    }
    ctx.beginPath();
    ctx.moveTo(seatx, seaty);
    ctx.lineTo(k2x, k2y);
    ctx.lineTo(pedal2X - 8, pedal2Y);
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
    
    

    // Frame and wheels
    ctx.beginPath();
    ctx.moveTo(W1X, Y);
    ctx.lineTo(W1X + 50, Y - 60);
    ctx.lineTo(W2X - 50, Y - 60);
    ctx.lineTo(W2X, Y);
    ctx.strokeStyle = COLOUR1;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Seat to front wheel connection
    ctx.beginPath();
    ctx.moveTo(W1X + 75, Y);
    ctx.lineTo(W1X + 45, Y - 72);
    ctx.stroke();

    // Draw the pedals and connections
    ctx.beginPath();
    ctx.moveTo(pedal1X, pedal1Y);
    ctx.lineTo(pedal2X, pedal2Y);
    ctx.strokeStyle = COLOUR2;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw wheels
    ctx.beginPath();
    ctx.arc(W1X, Y, WR, 0, 2 * pi);
    ctx.strokeStyle = COLOUR2;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(W2X, Y, WR, 0, 2 * pi);
    ctx.strokeStyle = COLOUR2;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner circle of the wheels and gears
    ctx.beginPath();
    ctx.arc(W1X, Y, 10, 0, 2 * pi);
    ctx.arc(W2X, Y, 5, 0, 2 * pi);
    ctx.arc(W1X + 75, Y, 10, 0, 2 * pi);
    ctx.fillStyle = COLOUR2;
    ctx.fill();
    
    // chain
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(W1X + 75, Y + 10);
    ctx.lineTo(W1X , Y + 10);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(W1X + 75, Y - 10);
    ctx.lineTo(W1X , Y - 10);
    ctx.stroke();
    
    

    

    // Wheel 1 spokes (rotating)
    for (let u = 0; u < spokeCount; u++) {
        let angle = spokeRotationAngle + u * spokeAngleIncrement; // Adding rotation

        let spokeX1 = WR * Math.cos(angle) + W1X;
        let spokeY1 = WR * Math.sin(angle) + Y;
        let spokeX2 = -WR * Math.cos(angle) + W1X;
        let spokeY2 = -WR * Math.sin(angle) + Y;

        ctx.beginPath();
        ctx.moveTo(spokeX1, spokeY1);
        ctx.lineTo(spokeX2, spokeY2);
        ctx.strokeStyle = COLOUR2;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Wheel 2 spokes (rotating)
    for (let u = 0; u < spokeCount; u++) {
        let angle = spokeRotationAngle + u * spokeAngleIncrement; // Adding rotation

        let spokeX1 = WR * Math.cos(angle) + W2X;
        let spokeY1 = WR * Math.sin(angle) + Y;
        let spokeX2 = -WR * Math.cos(angle) + W2X;
        let spokeY2 = -WR * Math.sin(angle) + Y;

        ctx.beginPath();
        ctx.moveTo(spokeX1, spokeY1);
        ctx.lineTo(spokeX2, spokeY2);
        ctx.strokeStyle = COLOUR2;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Update the rotation of the spokes
    spokeRotationAngle += spokeRotationSpeed; // Adjust the speed of spoke rotation here

    // Animate the pedal rotation
    b += pedalRotationSpeed;

    // **Draw the Saddle (triangle)**
    ctx.beginPath();
    ctx.moveTo(W1X + 30, Y - 73);  // Top of the triangle (seat)
    ctx.lineTo(W1X + 60, Y - 71);  // Bottom right
    ctx.lineTo(W1X + 30, Y - 64);  // Bottom left
    ctx.closePath();
    ctx.fillStyle = COLOUR2;  // Saddle color
    ctx.fill();

    // **Draw the Handlebars**
    ctx.beginPath();
    ctx.moveTo(W2X - 50, Y - 60);  // Start of the handlebar
    ctx.lineTo(W2X - 50, Y - 85);  // Vertical handlebar
    ctx.lineTo(W2X - 30, Y - 97);  // Curved top
    ctx.lineTo(W2X - 20, Y - 70);  // Handlebar down
    ctx.lineTo(W2X - 30, Y - 65);  // Return to start
    ctx.strokeStyle = COLOUR1;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw the pedals
    ctx.beginPath();
    ctx.moveTo(pedal1X - 8, pedal1Y);  // First pedal
    ctx.lineTo(pedal1X + 10, pedal1Y);
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pedal2X - 8, pedal2Y);  // Second pedal
    ctx.lineTo(pedal2X + 10, pedal2Y);
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 4;
    ctx.stroke();

    // **Draw Feet (circles on pedals)**
    // ctx.beginPath();
    // ctx.arc(pedal1X, pedal1Y, 5, 0, 2 * pi);  // Left foot
    // ctx.arc(pedal2X, pedal2Y, 5, 0, 2 * pi);  // Right foot
    // ctx.fillStyle = COLOUR2;
    // ctx.fill();
    
    // hand
    ctx.beginPath();
    ctx.fillStyle = COLOUR3;
    ctx.arc(W2X - 26, Y - 65, 3, 0, 2 * pi); 
    ctx.fill();
    

    // Draw the character's head
    let ax = seatx + 15;
    let ay = seaty - 40;
    let bx = ax + 10;
    let by = ay - 10;

    ctx.beginPath();
    ctx.moveTo(seatx, seaty);
    ctx.lineTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineTo(bx + 20, by + 30);
    ctx.lineTo(W2X - 25, Y - 66);
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    
    ctx.strokeStyle = COLOUR3;
    
    // Draw the head
    let r = 20;
    ctx.beginPath();
    ctx.arc(bx + 5, by - r, r, 0, 2 * pi);
    ctx.stroke();

    // glasses rims
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(bx + 15, by - 20, 6, 0, 2 * pi);  // Right eye
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bx + 5, by - 20, 6, 0, 2 * pi);  // Left eye
    ctx.stroke();
    
    // eyes
    ctx.strokeStyle = COLOUR3;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(bx + 15, by - 20, 2, 0, 2 * pi);  // Right eye
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bx + 5, by - 20, 2, 0, 2 * pi);  // Left eye
    ctx.fill();

    // glasses arms
    ctx.beginPath();
    ctx.moveTo(bx, by - 20);  // Mouth
    ctx.lineTo(bx - 10, by - 20);
    ctx.stroke();
    
    
    requestAnimationFrame(draw);  // Loop the animation
    ctx.restore(); // Restore to the original state
    
}




// Start the animation


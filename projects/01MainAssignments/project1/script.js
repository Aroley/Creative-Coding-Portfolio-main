/* 
Interact with the object with your WASD or arrow keys. 
Press any other key to return to the normal rotation.
*/

let font;
let textTexture;
let radius = 180;
let spinX = 0;
let spinY = 0;
let words = ["ZHdK", "Interaction", "Design"]
let outputText = ""
let repetitionPreventer = 0

function preload() {
	font = loadFont('Montserrat-Black.otf');
	font = loadFont('Montserrat-Black.ttf');	// fallback font
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(font);
	textSize(24);
	textAlign(CENTER, CENTER);
	noStroke()

	textTexture = createGraphics((PI * 2 * radius), windowHeight * 2);
	textTexture.fill(255);
	textTexture.textFont(font);
	textTexture.background(0, 0, 0, 0);
	textTexture.textSize(82);

	for (let i = 0; i <= 42; i++) {
		let startVar = floor(random(words.length))
		do {
			startVar = floor(random(words.length));
		} while (startVar === repetitionPreventer);
		for (let j = 0; j < words.length; j++) {
			let currentVar = (startVar + j) % words.length
			outputText += words[currentVar] + " "
		}
		textTexture.text(outputText, 0, i * 120);
		outputText = ""
		repetitionPreventer = startVar
	}
	noStroke();
}
function draw() {
	background("#1D003A");
	pointLight(255, 255, 255, 0, 0, 200);

	rotateX(radians(180))


	push()
	translate(0, 0, 0);
	pointLight(255, 255, 255, 0, 0, 800);
	rotateY(spinY);
	rotateZ(frameCount * 0.001); // Default rotation
	texture(textTexture);
	rotateX(PI + spinX)
	torus(radius * 2, 300, 200, 200);
	pop();

	// Controls
	if (key === 'w' || keyCode === UP_ARROW) {
		spinX += 0.02
	}

	else if (key === 's' || keyCode === DOWN_ARROW) {
		spinX -= 0.02
	}

	else if (key === 'a' || keyCode === LEFT_ARROW) {
		spinY += 0.02
	}

	else if (key === 'd' || keyCode === RIGHT_ARROW) {
		spinY -= 0.02
	} else {
		spin = 0
	}
}


let volumeArray = []
let tileArray = []
let rectSize = 100
let tileSpacing = rectSize * 1.1
let spin = false
let scrollSpeed = 0
let targetSpeed = 0
let showResult = false
let button
let volume=0
let middleTile=0
let firstVisit

function preload() {
	font = loadFont('Montserrat-Black.otf');
	font = loadFont('Montserrat-Black.ttf');	// fallback font
}

function setup() {
	createCanvas(windowWidth - (windowWidth / 12),windowHeight - (windowHeight / 12))
	background(100)
	rectMode(CENTER)
	textAlign(CENTER)
	textSize(24)
	textFont(font);
	noStroke()

	firstVisit=true;


	// Set up volumeArray with numbers from 1 to 100
	for (let i = 1; i <= 100; i++) {
		volumeArray.push(i)
	}
	volumeArray = shuffle(volumeArray)

	// Create Tiles for array
	for (let i = 0; i < volumeArray.length; i++) {
		let col = color(200, 100, 50)
		let xPos = i * tileSpacing
		tileArray[i] = new Tile(xPos, height/2-100, col, volumeArray[i])
	}

	button = createButton("SPIN")
	button.mouseClicked(spinToggle)
	button.size(200, 100)
	button.position(width / 2-100, height / 2)
	button.style("font-family", "Montserrat-Black")
	button.style("font-size", "48px")
}

function draw() {
	background(100)
	textAlign(CENTER)
	let titleText="Spin to set your volume!"
	textSize(42)
	text(titleText,width/2,200)
	textSize(30)
	text("Current Volume: "+volume, width *0.8, height - 150)
	
	
	// Draw background
	/* 
	TODO
	*/

	// Move and display each tile
	for (let i = 0; i < tileArray.length; i++) {
		tileArray[i].move()
		tileArray[i].makeTile()
	}

	// When stopping, find the middle tile and display result
	if (!spin && showResult) {
	
		middleTile = getMiddleTile()
		
		//text(`🔊 ${middleTile.value}`, width / 2, height - 50) // Emoji not displaying :(
		textSize(42)
		text(`${middleTile.value}`, width / 2, height / 2+50)
		textSize(24)
	}

	// Gradually spin
	if(spin&&scrollSpeed<20){ 
		scrollSpeed += 1
	}else if(!spin&&scrollSpeed>0){
		scrollSpeed=lerp(scrollSpeed, targetSpeed, random(0.02,0.002)) // Gradual slowdown into stop (thanks Flo)	
	}
	
	// Show button & update volume
	if(!spin&&scrollSpeed<=0.01){
		button.show()
		button.html("SPIN")

		 if (!middleTile) {
            middleTile = getMiddleTile();
        }
		if(firstVisit){
			volume=0
		}else{
			volume = middleTile.value
		}
        
    
		
	}

}

// Randomize array and toggle spin state
function spinToggle() {
	firstVisit = false
	showResult = false
	spin = !spin

	if (spin) {
		shuffleArray()
		button.html("STOP")
	} else {
		textAlign(LEFT)
		showResult = true
		button.hide()
	}

}

// Shuffle array as key is pressed and tiles aren't spinning
function shuffleArray() {

		volumeArray = shuffle(volumeArray)
		for (let i = 0; i < tileArray.length; i++) {
			tileArray[i].value = volumeArray[i]
	}
}

// Get middle msot tile
function getMiddleTile() {
	let centerX = width / 2
	let closestTile
	let minDist = 100

	for (let i = 0; i < tileArray.length; i++) {
		let tile = tileArray[i]
		let distanceToCenter = abs(tile.x - centerX) // Absolute distance from middle
		if (distanceToCenter < minDist) {
			minDist = distanceToCenter
			closestTile = tile
		}
	}
	return closestTile
}

class Tile {
	constructor(x, y, col, value) {
		this.x = x
		this.y = y
		this.col = col
		this.value = value
	}

	move() {
		this.x -= scrollSpeed

		// Move tile to right as soon as off screen
		if (this.x < -rectSize) {
			this.x = (tileArray.length-1) * tileSpacing
		}
	}

	makeTile() {
		push()
		translate(this.x, this.y)
		fill(this.col)
		rect(0, 0, rectSize, rectSize)
		fill(255)
		text(this.value, 0, 5)
		pop()
	}
}

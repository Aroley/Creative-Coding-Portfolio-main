let volumeArray = []
let tileArray = []
let rectSize = 140
let tileSpacing = rectSize * 1.1
let spin = false
let scrollSpeed = 0
let targetSpeed = 0
let showResult = false
let button
let volume=0
let middleTile=0
let firstVisit
let maxVolume =100


function preload() {
	font = loadFont('Montserrat-Black.otf')
	// font = loadFont('Montserrat-Black.ttf')	// fallback font
	
}

function setup() {
	createCanvas(windowWidth,windowHeight)
	background(100)
	rectMode(CENTER)
	textAlign(CENTER)
	textSize(32)
	textFont(font);
	strokeCap(SQUARE)
	noStroke()

	firstVisit=true;
	
	


	// Set up volumeArray with numbers from 1 to 100
	for (let i = 1; i <= maxVolume; i++) {
		volumeArray.push(i)
	}
	volumeArray = shuffle(volumeArray)

	// Create Tiles for array
	for (let i = 0; i < volumeArray.length; i++) {
		let col = color(255)
		let xPos = i * tileSpacing
		tileArray[i] = new Tile(xPos, height*0.5, col, volumeArray[i])
	}

	button = createButton("SPIN")
	button.mouseClicked(spinToggle)
	button.size(400, 100)
	button.position(width / 2-200, height*0.67)
	button.style("font-family", "Montserrat-Black")
	button.style("font-size", "48px")
}

function draw() {
	background(20)
	textAlign(CENTER)
	let titleText="SPIN TO \nSET YOUR VOLUME!"
	textSize(100)
	fill(20)
	stroke("#6610f2")
	strokeWeight(4)
	text(titleText,width/2,height*0.205)
	fill(255)
	noStroke()
	text(titleText,width*0.505,height*0.2)
	textSize(30)
	text("CURRENT VOLUME: "+volume, width / 2, height*0.84)


	

	// Move and display each tile
	for (let i = 0; i < tileArray.length; i++) {
		tileArray[i].move()
		tileArray[i].makeTile()
	}

	// When stopping, find the middle tile and display result
	if (!spin && showResult) {
	
		middleTile = getMiddleTile()
		
		//text(`🔊 ${middleTile.value}`, width / 2, height - 50) // Emoji not displaying :(
		textSize(54)
		text(`${middleTile.value}`, width / 2, height*0.74)
		textSize(32)
	}

	// Gradually spin
	if(spin&&scrollSpeed<20){ 
		scrollSpeed += 2
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

	// Pointer to show selection
	stroke("#6610f2")
	//triangle(width/2, height*0.4, width*0.48, height*0.35, width*0.52, height*0.35);
	line(width/2,height*0.4,width/2,height*0.6)
	

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
	let centerX = width / 2+(rectSize/2) // Compensating for adjustments made
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
		this.x -= scrollSpeed;
		// Wrap around when the tile moves off the left side
		let totalWidth = tileArray.length * tileSpacing;
		// Keep x within the bounds of 0 and totalWidth
		this.x = (this.x + totalWidth) % totalWidth;
		// If it goes off the left side, ensure it correctly wraps to the right
		if (this.x < 0) {
		this.x += totalWidth;
		}
		}

	makeTile() {
		push()
		translate(this.x, this.y)
		fill(this.col)
		rect(-rectSize/2, 0, rectSize, rectSize,0,20,0,20)
		fill(20)
		text(this.value, -rectSize/2, 10)
		pop()
	}
}




// Var and events



var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")


function component(width, height, color, x, y, type) {
    this.type = type;
	if (type === "image") {
		this.image = new Image
		this.image.src = color
	}
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0; 
    this.gravity = 0.15;
    this.gravitySpeed = 0;
	this.runningStart = false;
	this.standing = false;
	this.superJump = false;
	this.duck = false
    this.update = function() {
		if (type === "image") {
			ctx.beginPath()
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			ctx.closePath()
		} else {
			ctx.beginPath()
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.fill()
			ctx.closePath()
		}
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
		this.hitBottom()
		if (this.x <= -150) {
			this.x = canvas.width + 50
		} else if (this.x >= canvas.width + 100) {
			this.x = -50
		}
    }
	this.hitBottom = function() {
		var rockbottom = canvas.height - this.height
		if (this.y > rockbottom) {
			this.y = rockbottom
		}
	}
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
l
var dead = false
var paused = false
var gameRunning = false


var selection = 0
var maxOptions = 2
var pauseSelection = 0

var cheated = false

var scoreP1 = 0
var scoreP2 = 0
var scoreCollected = false

var exitTo = "file:///P:/Webside/Spil/"

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)



// Sound



var JumpSoundP1 = new sound("Jump.wav")
var JumpSoundP2 = new sound("Jump.wav")
var TreasureGet = new sound("Pickup_Coin.wav")
var TreasureGet2 = new sound("Pickup_Coin.wav")
var Playin = false
var BackgroundMusic = new sound("Visager_-_05_-_Battle.mp3")
var MenuMusic = new sound("Ketsa_-_10_-_A_Waiting_Game.mp3")




// Keybinds





var DPressed = false
var APressed = false
var WPressed = false
var SPressed = false

var RightPressed = false
var LeftPressed = false
var UpPressed = false
var DownPressed = false

function keyDownHandler(e) {
	if(e.keyCode == 32) {
		if (gameRunning) {
			SpacePressed = true
		} 
	} else if (e.keyCode == 68) {
		if (gameRunning) {
			DPressed = true
		}
	} else if (e.keyCode == 123) {
		if (gameRunning) {
			dead = true
			setInterval(function nope() {cheated = true}, 10)
		}
	} else if (e.keyCode == 73) {
		if (gameRunning) {
			dead = true
			setInterval(function nope() {cheated = true}, 10)
		}
	} else if (e.keyCode == 65) {
		if (gameRunning) {
			APressed = true
		}
	} else if (e.keyCode == 87) {
		if (gameRunning) {
			WPressed = true
		}
	} else if (e.keyCode == 83) {
		if (gameRunning) {
			SPressed = true
			P1.height = 25
			P1.superJump = true
			P1.duck = true
		}
	} else if (e.keyCode == 39) {
		if (gameRunning) {
			RightPressed = true
		}
	} else if (e.keyCode == 37) {
		if (gameRunning) {
			LeftPressed = true
		}
	} else if (e.keyCode == 38) {
		if (gameRunning) {
			UpPressed = true
		}
	} else if (e.keyCode == 40) {
		if (gameRunning) {
			DownPressed = true
			P2.height = 25
			P2.superJump = true
			P2.duck = true
		}
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 32) {
		if (gameRunning && !paused) {
			SpacePressed = false
		} else if (paused) {
			pauseSelect()
		} else if (!gameRunning) {
			select()
		}
	} else if (e.keyCode == 27) {
		if (gameRunning && !dead) {
			togglePause()
		}
	} else if (e.keyCode == 38) {
		if (!gameRunning) {
			changeOption("up")
		} else if (paused) {
			changePause()
		} else if (gameRunning) {
			UpPressed = false
		}
	} else if (e.keyCode == 40) {
		if (!gameRunning) {
			changeOption("down")
		} else if (paused) {
			changePause()
		} else if (gameRunning) {
			DownPressed = false
			P2.height = 50
			setTimeout(function jump() {P2.superJump = false}, 100)
			if (P2.standing) {P2.y = P2.y - P2.height/2}
		}
	} else if (e.keyCode == 13) {
		if (!gameRunning) {
			select()
		} else if (paused) {
			pauseSelect()
		} 
	} else if (e.keyCode == 68) {
		if (gameRunning) {
			DPressed = false
			P1.runningStart = false
		}
	} else if (e.keyCode == 65) {
		if (gameRunning) {
			APressed = false
			P1.runningStart = false
		}
	} else if (e.keyCode == 87) {
		if (gameRunning) {
			WPressed = false
		}
	} else if (e.keyCode == 83) {
		if (gameRunning) {
			SPressed = false
			P1.height = 50
			setTimeout(function jump() {P1.superJump = false}, 100)
			if (P1.standing) {P1.y = P1.y - P1.height/2}
		}
	} else if (e.keyCode == 39) {
		if (gameRunning) {
			RightPressed = false
			P2.runningStart = false
		}
	} else if (e.keyCode == 37) {
		if (gameRunning) {
			LeftPressed = false
			P2.runningStart = false
		}
	} else if (e.keyCode == 38) {
		if (gameRunning) {
			UpPressed = false
		}
	}
}






// Menu




var title = new component(800, 300, "Title.png", canvas.width/2-400, 0, "image");


function option1() {
	ctx.font = "70px 'Press Start 2P', cursive";
	if (selection === 0) {
		ctx.fillStyle = "#ffff00";
	} else {
		ctx.fillStyle = "#ffffff";
	}
	ctx.textAlign = "center";
	ctx.fillText("Play", canvas.width/2, canvas.height/2-30-74);
}

function option2() {
	ctx.font = "70px 'Press Start 2P', cursive";
	if (selection === 1) {
		ctx.fillStyle = "#ffff00";
	} else {
		ctx.fillStyle = "#ffffff";
	}
	ctx.textAlign = "center";
	ctx.fillText("Credits", canvas.width/2, canvas.height/2+ canvas.height/2/2 -90- 74);
}

function option3() {
	ctx.font = "60px 'Press Start 2P', cursive";
	if (selection === 2) {
		ctx.fillStyle = "#ffff00";
	} else {
		ctx.fillStyle = "#ffffff";
	}
	ctx.textAlign = "center";
	ctx.fillText("Exit", canvas.width/2, canvas.height/2+ canvas.height/2/2 + canvas.height/2/2 -50-74);
}

function GameStart() {
	clearInterval(menu)
	gameRunning = true
	score = 0
	game = setInterval(draw, 10)
	document.getElementById("body").style = "background: #fcef45;"
	MenuMusic.stop()
	BackgroundMusic.play()
}

function changeOption(updown) {
	if (updown === "up") {
		if (selection === 0) {
			selection = maxOptions
		} else {
			selection -= 1
		}
	} else if ("down") {
		if (selection === maxOptions) {
			selection = 0
		} else {
			selection += 1
		}
	}
}

var credit = 0
var time = 0

function credits() {
	document.getElementById("body").style = "background: #000;"
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.font = "60px 'Arial Black', Gadget, sans-serif";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "center"
	ctx.fillText("Made by lasse333", canvas.width/2, credit);
	if (time >= 300) {setTimeout(function reset() {location.reload(true)}, 3000)}
	credit += 4
	time += 1
}

function select() {
	if (selection === 0 && !dead) {
		GameStart()
	} else if (selection === 1 && !dead) {
		clearInterval(menu)
		setInterval(credits, 10)
		setTimeout(function reset() {location.reload(true)}, 7000)
	} else if (selection === 2 && !dead) {
		window.location.href = exitTo;
	}
}

function drawMenu() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	
	BackGround1.update()
	BackGround2.update()
	
	title.update()
	option1()
	option2()
	option3()
	
	BackGroundMove()
}






// Pause Menu





function togglePause() {
	if (!paused) {
		if (!dead && gameRunning) {
			miniMenu = setInterval(pauseMenu, 10)
			paused = true
		}
		paused = true
		
	} else if (paused) {
		clearInterval(miniMenu)
		paused = false
		if (gameRunning) {
			unPause()
		}
	}
}

function pause() {
	if (paused) {
		clearInterval(game)
		BackgroundMusic.stop()
	}
}

function unPause() {
	if (!paused) {
		game = setInterval(draw, 10);
		BackgroundMusic.play()
	}
}

function frame() {
	ctx.beginPath()
	ctx.rect(canvas.width/2-375, canvas.height/2-225, 750, 450)
	ctx.fillStyle = "yellow"
	ctx.fill()
	ctx.closePath()
}

function innerFrame() {
	ctx.beginPath()
	ctx.rect(canvas.width/2-370, canvas.height/2-220, 740, 440)
	ctx.fillStyle = "#000000"
	ctx.fill()
	ctx.closePath()
}

function pauseTitle() {
	ctx.font = "70px 'Arial Black', Gadget, sans-serif";
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = "left"
	ctx.fillText("Paused", canvas.width/2-350, canvas.height/2-145);
}

function pauseOption1() {
	ctx.font = "40px 'Arial Black', Gadget, sans-serif";
	if (pauseSelection === 0) {
		ctx.fillStyle = "#ffff00";
	} else {
		ctx.fillStyle = "#ffffff";
	}
	ctx.fillText("Resume", canvas.width/2-330, canvas.height/2-60);
}

function pauseOption2() {
	ctx.font = "40px 'Arial Black', Gadget, sans-serif";
	if (pauseSelection === 1) {
		ctx.fillStyle = "#ffff00";
	} else {
		ctx.fillStyle = "#ffffff";
	}
	ctx.fillText("Quit to Menu", canvas.width/2-330, canvas.height/2+10);
}

function pauseCredit() {
	ctx.font = "30px 'Arial Black', Gadget, sans-serif";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Made by lasse333", canvas.width/2+5, canvas.height/2+200);
}

function pauseSelect() {
	if (pauseSelection === 0) {
		clearInterval(miniMenu)
		paused = false
		unPause()
	} else if (pauseSelection === 1) {
		location.reload(true)
	}
}

function changePause() {
	if (pauseSelection === 0) {
		pauseSelection = 1
	} else if (pauseSelection === 1) {
		pauseSelection = 0
	}
}

function pauseMenu() {
	frame()
	innerFrame()
	pauseTitle()
	pauseOption1()
	pauseOption2()
	pauseCredit()
	
}




// Game



var P1 = new component(50, 50, "Blue_Player.png", 80, 75, "image")
var P2 = new component(50, 50, "Red_Player.png", canvas.width - P1.x-50, 75, "image")
var Coin = new component(30, 30, "Chest.png", canvas.width/2-15, canvas.height-100, "image")

var Platform1 = new component(600, 20, "Platform.png", canvas.width/2-600/2, canvas.height/2 + canvas.height/2/2, "image")
var Platform2 = new component(600, 20, "Platform.png", canvas.width/2-600/2, canvas.height/2/2, "image")
var Platform3 = new component(600, 20, "Platform.png", canvas.width-500, canvas.height/2, "image")
var Platform4 = new component(600, 20, "Platform.png", -100, canvas.height/2, "image")
var Platform5 = new component(canvas.width, 500, "Ground.png", 0, 900, "image")

var BackGround1 = new component(1920, 900, "BackGround.png", 0, 0, "image")
var BackGround2 = new component(1920, 900, "BackGround.png", 1920, 0, "image")
var Pillars = new component(1920, 900, "BackGround_Pillars.png", 0, 30, "image")


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	pause()
	
	BackGround1.update()
	BackGround2.update()
	Pillars.update()
	
	displayScore()
	countDown()
	
	Platform1.update()
	Platform2.update()
	Platform3.update()
	Platform4.update()
	Platform5.update()
	
	PlatformHitbox()
	
	P1.update()
	P2.update()
	Coin.update()
	
	moveP1()
	moveP2()
	
	touchP1()
	touchP2()
	coinHitbox()
	
	P1.newPos()
	P2.newPos()
	Coin.newPos()
	BackGroundMove()
	
	GameOver()
	console.log(window.innerHeight)
}

function touchP1() {
	if (P1.y >= P2.y && P1.y <= P2.y + P2.height / 2 && P1.x + P1.width >= P2.x && P1.x < P2.x + P2.width / 2) {
		P1.x = P2.x - P1.width
		if (DPressed) {P1.speedX = 0}
	} else if (P1.y >= P2.y && P1.y <= P2.y + P2.height / 2 && P1.x >= P2.x + P2.width / 2 && P1.x <= P2.x + P2.width) {
		P1.x = P2.x + P2.width
		if (APressed) {P1.speedX = 0}
	} else if (P1.y >= P2.y - P2.height && P1.y <= P2.y + P2.height / 2 && !DownPressed && P1.x < P2.x + P1.width && P1.x > P2.x - P1.width) {
		P1.y = P2.y - P1.height
		P1.standing = true
		if (!WPressed) {P1.gravitySpeed = 0}
	}
	P2.duck = false
	P1.duck = false
}

function touchP2() {
	if (P2.y >= P1.y && P2.y <= P1.y + P1.height / 2 && P2.x + P2.width >= P1.x && P2.x < P1.x + P1.width / 2) {
		P2.x = P1.x - P2.width
		if (RightPressed) {
			P2.speedX = 0
		}
	} else if (P2.y >= P1.y && P2.y <= P1.y + P1.height / 2 && P2.x >= P1.x + P1.width / 2 && P2.x <= P1.x + P1.width) {
		P2.x = P1.x + P1.width
		if (LeftPressed) {
			P2.speedX = 0
		}
	} else if (P2.y >= P1.y - P1.height && P2.y <= P1.y + P1.height / 2 && !SPressed && P2.x < P1.x + P2.width && P2.x > P1.x - P2.width) {
		P2.y = P1.y - P2.height
		P2.standing = true
		if (!UpPressed) {P2.gravitySpeed = 0}
	}
}

function coinHitbox() {
	if (!scoreCollected) {
		if (Coin.x + Coin.width >= P2.x && Coin.x <= P2.x + P2.width && Coin.y + Coin.height >= P2.y && Coin.y <= P2.y + P2.height) {
			CoinCollect(2)
			console.log("P2")
		} else if (Coin.x + Coin.width >= P1.x && Coin.x <= P1.x + P1.width && Coin.y + Coin.height >= P1.y && Coin.y <= P1.y + P1.height) {
			CoinCollect(1)
			console.log("P1")
		}
	}
}

function PlatformHitbox() {
	if (P1.y >= Platform1.y - P1.height && P1.y <= Platform1.y + Platform1.height && P1.x < Platform1.x + Platform1.width && P1.x > Platform1.x - P1.width) {
		if (P1.gravitySpeed > 0) {
			P1.y = Platform1.y - P1.height
			P1.standing = true
			if (!WPressed) {P1.gravitySpeed = 0}
		}
	} else if (P1.y >= Platform2.y - P1.height && P1.y <= Platform2.y + Platform2.height && P1.x < Platform2.x + Platform2.width && P1.x > Platform2.x - P1.width) {
		if (P1.gravitySpeed > 0) {
			P1.y = Platform2.y - P1.height
			P1.standing = true
			if (!WPressed) {P1.gravitySpeed = 0}
		}
	} else if (P1.y >= Platform3.y - P1.height && P1.y <= Platform3.y + Platform3.height && P1.x < Platform3.x + Platform3.width && P1.x > Platform3.x - P1.width) {
		if (P1.gravitySpeed > 0) {
			P1.y = Platform3.y - P1.height
			P1.standing = true
			if (!WPressed) {P1.gravitySpeed = 0}
		}
	} else if (P1.y >= Platform4.y - P1.height && P1.y <= Platform4.y + Platform4.height && P1.x < Platform4.x + Platform4.width && P1.x > Platform4.x - P1.width) {
		if (P1.gravitySpeed > 0) {
			P1.y = Platform4.y - P1.height
			P1.standing = true
			if (!WPressed) {P1.gravitySpeed = 0}
		}
	} else if (P1.y >= Platform5.y - P1.height && P1.y <= Platform5.y + Platform5.height && P1.x < Platform5.x + Platform5.width && P1.x > Platform5.x - P1.width) {
		if (P1.gravitySpeed > 0) {
			P1.y = Platform5.y - P1.height
			P1.standing = true
			if (!WPressed) {P1.gravitySpeed = 0}
		}
	}
	if (P2.y >= Platform1.y - P2.height && P2.y <= Platform1.y + Platform1.height && P2.x < Platform1.x + Platform1.width && P2.x > Platform1.x - P2.width) {
		if (P2.gravitySpeed > 0) {
			P2.y = Platform1.y - P2.height
			P2.standing = true
			if (!UpPressed) {P2.gravitySpeed = 0}
		}
	} else if (P2.y >= Platform2.y - P2.height && P2.y <= Platform2.y + Platform2.height && P2.x < Platform2.x + Platform2.width && P2.x > Platform2.x - P2.width) {
		if (P2.gravitySpeed > 0) {
			P2.y = Platform2.y - P2.height
			P2.standing = true
			if (!UpPressed) {P2.gravitySpeed = 0}
		}
	} else if (P2.y >= Platform3.y - P2.height && P2.y <= Platform3.y + Platform3.height && P2.x < Platform3.x + Platform3.width && P2.x > Platform3.x - P2.width) {
		if (P2.gravitySpeed > 0) {
			P2.y = Platform3.y - P2.height
			P2.standing = true
			if (!UpPressed) {P2.gravitySpeed = 0}
		}
	} else if (P2.y >= Platform4.y - P2.height && P2.y <= Platform4.y + Platform4.height && P2.x < Platform4.x + Platform4.width && P2.x > Platform4.x - P2.width) {
		if (P2.gravitySpeed > 0) {
			P2.y = Platform4.y - P2.height
			P2.standing = true
			if (!UpPressed) {P2.gravitySpeed = 0}
		}
	} else if (P2.y >= Platform5.y - P2.height && P2.y <= Platform5.y + Platform5.height && P2.x < Platform5.x + Platform5.width && P2.x > Platform5.x - P2.width) {
		if (P2.gravitySpeed > 0) {
			P2.y = Platform5.y - P2.height
			P2.standing = true
			if (!UpPressed) {P2.gravitySpeed = 0}
		}
	}
	if (Coin.y >= Platform1.y - Coin.height && Coin.y <= Platform1.y + Platform1.height && Coin.x < Platform1.x + Platform1.width && Coin.x > Platform1.x - Coin.width) {
		if (Coin.gravitySpeed > 0) {
			Coin.y = Platform1.y - Coin.height
			Coin.standing = true
			Coin.gravitySpeed = 0
		}
	} else if (Coin.y >= Platform2.y - Coin.height && Coin.y <= Platform2.y + Platform2.height && Coin.x < Platform2.x + Platform2.width && Coin.x > Platform2.x - Coin.width) {
		if (Coin.gravitySpeed > 0) {
			Coin.y = Platform2.y - Coin.height
			Coin.standing = true
			Coin.gravitySpeed = 0
		}
	} else if (Coin.y >= Platform3.y - Coin.height && Coin.y <= Platform3.y + Platform3.height && Coin.x < Platform3.x + Platform3.width && Coin.x > Platform3.x - Coin.width) {
		if (Coin.gravitySpeed > 0) {
			Coin.y = Platform3.y - Coin.height
			Coin.standing = true
			Coin.gravitySpeed = 0
		}
	} else if (Coin.y >= Platform4.y - Coin.height && Coin.y <= Platform4.y + Platform4.height && Coin.x < Platform4.x + Platform4.width && Coin.x > Platform4.x - Coin.width) {
		if (Coin.gravitySpeed > 0) {
			Coin.y = Platform4.y - Coin.height
			Coin.standing = true
			Coin.gravitySpeed = 0
		}
	} else if (Coin.y >= Platform5.y - Coin.height && Coin.y <= Platform5.y + Platform5.height && Coin.x < Platform5.x + Platform5.width && Coin.x > Platform5.x - Coin.width) {
		if (Coin.gravitySpeed > 0) {
			Coin.y = Platform5.y - Coin.height
			Coin.standing = true
			Coin.gravitySpeed = 0
		}
	}
}

function moveP1() {
	if (DPressed) {
		if (!SPressed && P1.y >= canvas.height - P1.height || P1.standing && !SPressed) {
			P1.speedX = 10
			P1.runningStart = true
			if (WPressed && P1.y >= canvas.height - P1.height || WPressed && P1.standing) {
				P1.gravitySpeed = -5
				P1.speedX = 13
				JumpSoundP1.play()
			}
		} else if (SPressed && P1.y >= canvas.height - P1.height || SPressed && P1.standing) {
			P1.speedX = 5
		} else if (!P1.runningStart) {
			P1.speedX = 2
		}
	} else if (APressed) {
		if (!SPressed && P1.y >= canvas.height - P1.height || P1.standing && !SPressed) {
			P1.speedX = -10
			P1.runningStart = true
			if (WPressed && P1.y >= canvas.height - P1.height || WPressed && P1.standing) {
				P1.gravitySpeed = -5
				P1.speedX = -13
				JumpSoundP1.play()
			}
		} else if (SPressed && P1.y >= canvas.height - P1.height || SPressed && P1.standing) {
			P1.speedX = -5
		} else if (!P1.runningStart) {
			P1.speedX = -2
		}
	} else if (WPressed && !DPressed && !APressed && !SPressed) {
		if (P1.y >= canvas.height - P1.height || P1.standing) {
			if(!P1.superJump) {
				P1.gravitySpeed = -10
			} else if (P1.superJump) {
				P1.gravitySpeed = -15
			}
			if (!P1.duck) {P1.standing = false}
			if (P1.speedX > 2 || -2 > P1.speedX) {
				if (P1.speedX > 2) {
					P1.speedX = 2
				} else if (-2 > P1.speedX) {
					P1.speedX = -2
				}
			}
			JumpSoundP1.play()
		}
	} else if (SPressed && !P1.standing) {
		P1.gravitySpeed = 25
		P1.speedX = 0
	} else if (P1.y >= canvas.height - P1.height || P1.standing) {
		P1.speedX = 0
	}
	if (P1.gravitySpeed > 0 || P1.gravitySpeed < 0) {
		P1.standing = false
	}
}

function moveP2() {
	if (RightPressed) {
		if (!DownPressed && P2.y >= canvas.height - P2.height || P2.standing && !DownPressed) {
			P2.speedX = 10
			P2.runningStart = true
			if (UpPressed && P2.y >= canvas.height - P2.height || UpPressed && P2.standing) {
				P2.gravitySpeed = -5
				P2.speedX = 13
				JumpSoundP2.play()
			}
		} else if (DownPressed && P2.y >= canvas.height - P2.height || DownPressed && P2.standing) {
			P2.speedX = 5
		} else if (!P2.runningStart) {
			P2.speedX = 2
		}
	} else if (LeftPressed) {
		if (!DownPressed && P2.y >= canvas.height - P2.height || P2.standing && !DownPressed) {
			P2.speedX = -10
			P2.runningStart = true
			if (UpPressed && P2.y >= canvas.height - P2.height || UpPressed && P2.standing) {
				P2.gravitySpeed = -5
				P2.speedX = -13
				JumpSoundP2.play()
			}
		} else if (DownPressed && P2.y >= canvas.height - P2.height || DownPressed && P2.standing) {
			P2.speedX = -5
		} else if (!P2.runningStart) {
			P2.speedX = -2
		}
	} else if (UpPressed && !RightPressed && !LeftPressed && !DownPressed) {
		if (P2.y >= canvas.height - P2.height || P2.standing) {
			if(!P2.superJump) {
				P2.gravitySpeed = -10
			} else if (P2.superJump) {
				P2.gravitySpeed = -15
			}
			if (!P2.duck) {P2.standing = false}
			if (P2.speedX > 2 || -2 > P2.speedX) {
				if (P2.speedX > 2) {
					P2.speedX = 2
				} else if (-2 > P2.speedX) {
					P2.speedX = -2
				}
			}
			JumpSoundP2.play()
		}
	} else if (DownPressed && !P2.standing) {
		P2.gravitySpeed = 25
		P2.speedX = 0
	} else if (P2.y >= canvas.height - P2.height || P2.standing) {
		P2.speedX = 0
	}
	if (P2.gravitySpeed > 0 || P2.gravitySpeed < 0) {
		P2.standing = false
	}
}

function GameOver() {
	if (dead) {
		clearInterval(game)
		gameRunning = false
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		BackGround1.update()
		BackGround2.update()
		ctx.font = "150px 'Arial Black', Gadget, sans-serif";
		ctx.fillStyle = "#ff0000";
		ctx.textAlign = "center";
		if (scoreP1 > scoreP2) {
			ctx.fillStyle = "blue";
			ctx.fillText("Blue Wins", canvas.width/2, canvas.height/2);
			
			P1.height = 250
			P1.width = 250
			P1.x = 320
			P1.y = canvas.height - P1.height
			
			Coin.height = 150
			Coin.width = 150
			Coin.x = 1200
			Coin.y = canvas.height - Coin.height
			
			ctx.font = "40px Arial";
			ctx.fillStyle = "blue";
			ctx.textAlign = "center";
			ctx.fillText("Score: "+scoreP1, Coin.x+Coin.width/2, Coin.y-10);
			
			P1.update()
			Coin.update()
			
		} else if (scoreP2 > scoreP1) {
			ctx.fillStyle = "#ff0000";
			ctx.fillText("Red Wins", canvas.width/2, canvas.height/2);
			
			P2.height = 250
			P2.width = 250
			P2.x = 320
			P2.y = canvas.height - P2.height
			
			Coin.height = 150
			Coin.width = 150
			Coin.x = 1200
			Coin.y = canvas.height - Coin.height
			
			ctx.font = "40px Arial";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("Score: "+scoreP2, Coin.x+Coin.width/2, Coin.y-10);
			
			P2.update()
			Coin.update()
			
		} else if (scoreP1 === scoreP2) {
			ctx.fillStyle = "#ffffff";
			ctx.fillText("Draw", canvas.width/2, canvas.height/2);
		}
		setTimeout(function reset() {location.reload(true)}, 3000)
	} else if (gameRunning) {
		
	}
}

function CoinCollect(player) {
	if (player === 2 && !scoreCollected) {
		scoreCollected = true
		scoreP2 += 5
	} else if (player === 1 && !scoreCollected) {
		scoreCollected = true
		scoreP1 += 5
	}
	
	if (!Playin) {
		TreasureGet.play()
		Playin = true
		setTimeout(function wait() {Playin = false}, 600)
	} else {
		TreasureGet2.play()
	}
	
	Coin.gravitySpeed = 0
	
	Coin.x = Math.floor(Math.random() * 1890)
	Coin.y = Math.floor(Math.random() * canvas.height-Coin.height)
	
	scoreCollected = false
	
}

function BackGroundMove() {
	BackGround1.x -= 1
	BackGround2.x -= 1
	
	if (BackGround1.x <= -1920) {
		BackGround1.x = 1920
	}
	if (BackGround2.x <= -1920) {
		BackGround2.x = 1920
	}
}



//GUI




function displayScore() {
	ctx.font = "30px 'Press Start 2P', cursive";
	ctx.fillStyle = "blue";
	ctx.textAlign = "left";
	ctx.fillText("Score: "+scoreP1, 20, 50);
	
	ctx.font = "30px 'Press Start 2P', cursive";
	ctx.fillStyle = "red";
	ctx.textAlign = "right";
	ctx.fillText("Score: "+scoreP2, canvas.width-40, 50);
}

var MM = 2
var SS = 00
var mm = 00
var space1 = ":"
var space2 = "."

function countDown() {
	
	mm -= 1
	
	if (mm === -1) {
		mm = 99
		SS -= 1
	}
	if (SS === -1) {
		SS = 59
		MM -= 1
	}
	if (MM === -1) {
		dead = true
	}
	if (SS < 10) {
		space1 = ":0"
	} else {
		space1 = ":"
	}
	if (mm < 10) {
		space2 = ".0"
	} else {
		space2 = "."
	}
	
	ctx.font = "50px 'Press Start 2P', cursive";
	ctx.fillStyle = "grey";
	ctx.textAlign = "center";
	ctx.fillText(MM+space1+SS+space2+mm, canvas.width/2, canvas.height/2-150)
}




// Start



var miniMenu
var game
var menu = setInterval(drawMenu, 10);
MenuMusic.play()

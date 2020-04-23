


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
    this.gravity = 0.3;
    this.gravitySpeed = 0;
	this.standing = false;
	this.score = 0
	this.boost = 15;
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
			this.standing = true
			this.gravitySpeed = 0;
			this.boost = 0
		}
	}
}

var KeyBoard = {
    Up: false,
    Down: false,
    Right: false,
    Left: false,
    Start: false,
    Buttons: [false, false, false, false, false, false]
};

var KeyBoard2 = {
    Up: false,
    Down: false,
    Right: false,
    Left: false,
    Start: false,
    Buttons: [false, false, false, false, false, false]
};

var Gamepads = [];

function Gamepad(id) {
    this.Id = id;
    this.Down = false;
    this.Right = false;
    this.Left = false;
    this.Up = false;
    this.Start = false;
    this.Buttons = [false, false, false, false, false, false];
    this.Update = function() {
        if (this.Id != "keyboard" && this.Id != "keyboard2") {
            if (navigator.getGamepads()[this.Id].id == "Wireless Gamepad (Vendor: 057e Product: 2006)") { //Joy-Con L
                if (navigator.getGamepads()[this.Id].axes[9] == -1) {
                    this.Up = true;
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.7142857313156128) {
                    this.Up = true;
                    this.Right = true;
                    this.Down = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.4285714030265808) {
                    this.Right = true;
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.1428571343421936) {
                    this.Right = true;
                    this.Down = true;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.14285719394683838) {
                    this.Down = true;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.4285714626312256) {
                    this.Down = true;
                    this.Left = true;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.7142857313156128) {
                    this.Left = true;
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 1) {
                    this.Left = true;
                    this.Up = true;
                    this.Down = false;
                    this.Right = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] > 1) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[8].pressed;
                for (i = 0; i < 6; i++) {
                    this.Buttons[i] = navigator.getGamepads()[this.Id].buttons[i].pressed;
                }
            }
            if (navigator.getGamepads()[this.Id].id == "Wireless Gamepad (Vendor: 057e Product: 2007)") { //Joy-Con R
                if (navigator.getGamepads()[this.Id].axes[9] == -1) {
                    this.Up = true;
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.7142857313156128) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.4285714030265808) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == -0.1428571343421936) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.14285719394683838) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.4285714626312256) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 0.7142857313156128) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] == 1) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (navigator.getGamepads()[this.Id].axes[9] > 1) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[9].pressed
                for (i = 0; i < 6; i++) {
                    this.Buttons[i] = navigator.getGamepads()[this.Id].buttons[i].pressed
                }
            }
            if (navigator.getGamepads()[this.Id].id == "Xbox 360 Controller (XInput STANDARD GAMEPAD)") { //Xbox 360 Wireless
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < -0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < -0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > -0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 && !navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[9].pressed || navigator.getGamepads()[this.Id].buttons[8].pressed
                for (i = 0; i < 4; i++) {
                    this.Buttons[i] = navigator.getGamepads()[this.Id].buttons[i].pressed
                }
                this.Buttons[4] = navigator.getGamepads()[this.Id].buttons[4].pressed || navigator.getGamepads()[this.Id].buttons[6].pressed
                this.Buttons[5] = navigator.getGamepads()[this.Id].buttons[5].pressed || navigator.getGamepads()[this.Id].buttons[7].pressed
            }
            if (navigator.getGamepads()[this.Id].id == "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)") { //PS4 Controller
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < -0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < -0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > -0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 && !navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[9].pressed || navigator.getGamepads()[this.Id].buttons[8].pressed || navigator.getGamepads()[this.Id].buttons[17].pressed
                for (i = 0; i < 4; i++) {
                    this.Buttons[i] = navigator.getGamepads()[this.Id].buttons[i].pressed
                }
                this.Buttons[4] = navigator.getGamepads()[this.Id].buttons[4].pressed || navigator.getGamepads()[this.Id].buttons[6].pressed
                this.Buttons[5] = navigator.getGamepads()[this.Id].buttons[5].pressed || navigator.getGamepads()[this.Id].buttons[7].pressed
            }
            if (navigator.getGamepads()[this.Id].id == "Joy-Con (L)") { //Joy-Con L Android
                if (!navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[6].pressed
                this.Buttons[0] = navigator.getGamepads()[this.Id].buttons[0].pressed
                this.Buttons[1] = navigator.getGamepads()[this.Id].buttons[1].pressed
                this.Buttons[3] = navigator.getGamepads()[this.Id].buttons[2].pressed
                this.Buttons[4] = navigator.getGamepads()[this.Id].buttons[3].pressed

            }
            if (navigator.getGamepads()[this.Id].id == "Joy-Con (R)") { //Joy-Con R Android
                if (!navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (!navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[7].pressed
                this.Buttons[0] = navigator.getGamepads()[this.Id].buttons[0].pressed
                this.Buttons[1] = navigator.getGamepads()[this.Id].buttons[1].pressed
                this.Buttons[3] = navigator.getGamepads()[this.Id].buttons[2].pressed
                this.Buttons[4] = navigator.getGamepads()[this.Id].buttons[3].pressed

            }
            if (navigator.getGamepads()[this.Id].id == "Pro Controller") { //Nintendo Pro Controller Android
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] < -0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Up = true
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Right = true
                    this.Down = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] > 0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Right = true
                    this.Down = true
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 || !navigator.getGamepads()[this.Id].buttons[15].pressed && navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[1] > 0.5 && navigator.getGamepads()[this.Id].axes[0] < -0.5 || navigator.getGamepads()[this.Id].buttons[13].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Down = true
                    this.Left = true
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 || !navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed) {
                    this.Left = true
                    this.Down = false;
                    this.Right = false;
                    this.Up = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] < -0.5 && navigator.getGamepads()[this.Id].axes[1] < -0.5 || navigator.getGamepads()[this.Id].buttons[12].pressed && navigator.getGamepads()[this.Id].buttons[14].pressed) {
                    this.Left = true
                    this.Up = true
                    this.Down = false;
                    this.Right = false;
                }
                if (navigator.getGamepads()[this.Id].axes[0] > -0.5 && navigator.getGamepads()[this.Id].axes[0] < 0.5 && navigator.getGamepads()[this.Id].axes[1] > -0.5 && navigator.getGamepads()[this.Id].axes[1] < 0.5 && !navigator.getGamepads()[this.Id].buttons[12].pressed && !navigator.getGamepads()[this.Id].buttons[13].pressed && !navigator.getGamepads()[this.Id].buttons[14].pressed && !navigator.getGamepads()[this.Id].buttons[15].pressed) {
                    this.Down = false;
                    this.Right = false;
                    this.Left = false;
                    this.Up = false;
                }
                this.Start = navigator.getGamepads()[this.Id].buttons[6].pressed || navigator.getGamepads()[this.Id].buttons[7].pressed
                this.Buttons[0] = navigator.getGamepads()[this.Id].buttons[0].pressed
                this.Buttons[1] = navigator.getGamepads()[this.Id].buttons[1].pressed
                this.Buttons[3] = navigator.getGamepads()[this.Id].buttons[2].pressed
                this.Buttons[4] = navigator.getGamepads()[this.Id].buttons[3].pressed || navigator.getGamepads()[this.Id].buttons[4].pressed
            }
		} else {
			if (this.Id == "keyboard") { //KeyBoard
				this.Down = KeyBoard.Down;
				this.Right = KeyBoard.Right;
				this.Left = KeyBoard.Left;
				this.Up = KeyBoard.Up;
				this.Start = KeyBoard.Start;
				for (i = 0; i < 6; i++) {
					this.Buttons[i] = KeyBoard.Buttons[i]
				}
			}
			if (this.Id == "keyboard2") { //KeyBoard2
				this.Down = KeyBoard2.Down;
				this.Right = KeyBoard2.Right;
				this.Left = KeyBoard2.Left;
				this.Up = KeyBoard2.Up;
				this.Start = KeyBoard2.Start;
				for (i = 0; i < 6; i++) {
					this.Buttons[i] = KeyBoard2.Buttons[i]
				}
			}

		}
    };
}

function GamepadUpdate() {
    if (Gamepads.length > 0) {
        Gamepads[0].Update()
    }
    if (Gamepads.length > 1) {
        Gamepads[1].Update()
    }
}

function GamepadConnect() {
    Gamepads = []
	

    for (i = 0; i < navigator.getGamepads().length; i++) {
        if (navigator.getGamepads()[i] != null) {
            if (navigator.getGamepads()[i].id != "Wireless Gamepad (Vendor: 057e Product: 2009)") {
                console.log(i + ": " + navigator.getGamepads()[i].id)
                Gamepads.push(Controller = new Gamepad(i))
                //players.push(P1 = new component(50, 50, "white", canvas.width / 2, canvas.height - 70))
            }
        }
    }

    if (Gamepads.length < 1) {
        Gamepads.push(Controller = new Gamepad("keyboard"))
        //players.push(P1 = new component(50, 50, "white", canvas.width / 2, canvas.height - 70))
    }
	if (Gamepads.length < 2) {
        Gamepads.push(Controller = new Gamepad("keyboard2"))
        //players.push(P1 = new component(50, 50, "white", canvas.width / 2, canvas.height - 70))
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

var Platforms = [];
var players = [];
var playersounds = []
var collectable = []

document.addEventListener("click",start , false)



// Sound



playersounds.push(JumpSoundP1 = new sound("Jump.wav"))
playersounds.push(JumpSoundP2 = new sound("Jump.wav"))
var TreasureGet = new sound("Pickup_Coin.wav")
var TreasureGet2 = new sound("Pickup_Coin.wav")
var Playin = false
var BackgroundMusic = new sound("Visager_-_05_-_Battle.mp3")
var MenuMusic = new sound("Ketsa_-_10_-_A_Waiting_Game.mp3")




// Keybinds






function keyDownHandler(e) {
	if(e.keyCode == 32) {
		if (gameRunning) {
			SpacePressed = true
		} 
	} else if (e.keyCode == 68) {
		if (gameRunning) {
			KeyBoard.Right = true
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
			KeyBoard.Left = true
		}
	} else if (e.keyCode == 87) {
		if (gameRunning) {
			KeyBoard.Buttons[0] = true
		}
	} else if (e.keyCode == 83) {
		if (gameRunning) {
			KeyBoard.Down = true
		}
	} else if (e.keyCode == 39) {
		if (gameRunning) {
			KeyBoard2.Right = true
		}
	} else if (e.keyCode == 37) {
		if (gameRunning) {
			KeyBoard2.Left = true
		}
	} else if (e.keyCode == 38) {
		if (gameRunning) {
			KeyBoard2.Buttons[0] = true
		}
	} else if (e.keyCode == 40) {
		if (gameRunning) {
			KeyBoard2.Down = true
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
		openFullscreen()
		if (gameRunning && !dead) {
			togglePause()
		}
	} else if (e.keyCode == 38) {
		if (!gameRunning) {
			changeOption("up")
		} else if (paused) {
			changePause()
		} else if (gameRunning) {
			KeyBoard2.Buttons[0] = false
		}
	} else if (e.keyCode == 40) {
		if (!gameRunning) {
			changeOption("down")
		} else if (paused) {
			changePause()
		} else if (gameRunning) {
			KeyBoard2.Down = false
		}
	} else if (e.keyCode == 13) {
		if (!gameRunning) {
			select()
		} else if (paused) {
			pauseSelect()
		} 
	} else if (e.keyCode == 68) {
		if (gameRunning) {
			KeyBoard.Right = false
			P1.runningStart = false
		}
	} else if (e.keyCode == 65) {
		if (gameRunning) {
			KeyBoard.Left = false
			P1.runningStart = false
		}
	} else if (e.keyCode == 87) {
		if (gameRunning) {
			KeyBoard.Buttons[0] = false
		}
	} else if (e.keyCode == 83) {
		if (gameRunning) {
			KeyBoard.Down = false
		}
	} else if (e.keyCode == 39) {
		if (gameRunning) {
			KeyBoard2.Right = false
			P2.runningStart = false
		}
	} else if (e.keyCode == 37) {
		if (gameRunning) {
			KeyBoard2.Left = false
			P2.runningStart = false
		}
	} else if (e.keyCode == 38) {
		if (gameRunning) {
			KeyBoard2.Up = false
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
	document.removeEventListener("click", GameStart)
	clearInterval(menu)
	gameRunning = true
	score = 0
	game = setInterval(draw, 10)
	document.getElementById("body").style = "background: #fcef45;"
	MenuMusic.stop()
	BackgroundMusic.play()
	
	for (i = 0; i < players.length; i++) {
		
		players[i].boosting = false;
		players[i].newPos = function() {
			this.gravitySpeed += this.gravity;
			this.x += this.speedX;
			this.y += this.speedY + this.gravitySpeed;
			this.hitBottom()
			if (this.x <= -150) {
				this.x = canvas.width + 50
			} else if (this.x >= canvas.width + 100) {
				this.x = -50
			}

			if (this.gravitySpeed > 0) {
				this.standing = false
			}
			
			for (var i = 0; i < Platforms.length; i++) {
				if (this.y >= Platforms[i].y - this.height && this.y <= Platforms[i].y + 5 && this.x < Platforms[i].x + Platforms[i].width && this.x > Platforms[i].x - this.width) {
					if (this.gravitySpeed > 0) {
						this.y = Platforms[i].y - this.height
						this.standing = true
						this.gravitySpeed = 0
						this.boost = 0
					}
				}
			}
		}
	}
	
	for (i = 0; i < collectable.length; i++) {
		collectable[i].newPos = function() {
			this.gravitySpeed += this.gravity;
			this.x += this.speedX;
			this.y += this.speedY + this.gravitySpeed;
			this.hitBottom()
			
			for (var i = 0; i < Platforms.length; i++) {
				if (this.y >= Platforms[i].y - this.height && this.y <= Platforms[i].y + 5 && this.x < Platforms[i].x + Platforms[i].width && this.x > Platforms[i].x - this.width) {
					if (this.gravitySpeed > 0) {
						this.y = Platforms[i].y - this.height
						this.standing = true
						this.gravitySpeed = 0
						this.boost = 0
					}
				}
			}
		}
    }
}

function changeOption(updown) {
	if (updown == "up") {
		if (selection == 0) {
			selection = maxOptions
		} else {
			selection -= 1
		}
	} else if (updown == "down") {
		if (selection == maxOptions) {
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
	ctx.fillText("Made by René Skjødt", canvas.width/2, credit);
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
		closeFullscreen()
		close()
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
	ctx.fillText("Made by René Skjødt", canvas.width/2+5, canvas.height/2+200);
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



players.push(P1 = new component(50, 50, "Blue_Player.png", 80, 75, "image"))
players.push(P2 = new component(50, 50, "Red_Player.png", canvas.width - P1.x-50, 75, "image"))
collectable.push(Coin = new component(30, 30, "Chest.png", canvas.width/2-15, canvas.height-210, "image"))

Platforms.push(Platform1 = new component(600, 20, "Platform.png", canvas.width/2-600/2, canvas.height/2 + canvas.height/2/2-50, "image"))
Platforms.push(Platform2 = new component(600, 20, "Platform.png", canvas.width/2-600/2, canvas.height/2/2-30, "image"))
Platforms.push(Platform3 = new component(600, 20, "Platform.png", canvas.width-500, canvas.height/2-80, "image"))
Platforms.push(Platform4 = new component(600, 20, "Platform.png", -100, canvas.height/2-80, "image"))
Platforms.push(Platform5 = new component(canvas.width+100, 500, "Ground.png", -50, 900, "image"))

var BackGround1 = new component(1920, 900, "BackGround.png", 0, 0, "image")
var BackGround2 = new component(1920, 900, "BackGround.png", 1920, 0, "image")
var Pillars = new component(1920, 900, "BackGround_Pillars.png", 0, 0, "image")


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	pause()
	
	BackGround1.update()
	BackGround2.update()
	Pillars.update()
	
	displayScore()
	countDown()
	
    for (i = 0; i < Platforms.length; i++) {
        Platforms[i].update()
    }
	
	for (i = 0; i < collectable.length; i++) {
        collectable[i].update()
		collectable[i].newPos()
    }
	
	/* PlatformHitbox() */
	
    for (i = 0; i < players.length; i++) {
        players[i].update()
        players[i].newPos()

        /* 		if (Gamepads[i].Up) {
			players[i].speedY = -5
		} else if (Gamepads[i].Down) {
			players[i].speedY = 5
		} else {
			players[i].speedY = 0
		} */
        if (!players[i].boosting || players[i].boost <= 0) {
            if (Gamepads[i].Left) {
                players[i].speedX = -11
				players[i].faceing = "left"
            } else if (Gamepads[i].Right) {
                players[i].speedX = 11
				players[i].faceing = "right"
            } else {
                players[i].speedX = 0
            }
        }
		if (Gamepads[i].Down && !Gamepads[i].Left && !Gamepads[i].Right) {
			players[i].speedX = 0
			players[i].gravitySpeed = 50
		}
        if (Gamepads[i].Buttons[0]) {
            if (players[i].standing) {
                players[i].gravitySpeed = -14
                players[i].standing = false
                players[i].boost = 15
				playersounds[i].play()
            }
        }
        if (Gamepads[i].Buttons[1]) {
			if (players[i].boost >= 0 && !players[i].standing) {
                players[i].gravity = 0.1
                players[i].gravitySpeed = 0
                if (!players[i].boosting) {
                    if (Gamepads[i].Left) {
                        players[i].speedX = -23
                    } else if (Gamepads[i].Right) {
                        players[i].speedX = 23
                    }
                }
                if (!Gamepads[i].Right && !Gamepads[i].Left && players[i].standing) {
                    players[i].speedX = 0
                }
                players[i].boosting = true;
                players[i].boost--
            } else {
                players[i].gravity = 0.3
                players[i].speedY = 0
            }
        } else {
            players[i].gravity = 0.3
            players[i].boosting = false;
        }
        if (Gamepads[i].Buttons[2]) {}
        if (Gamepads[i].Buttons[3]) {
            
        }
        if (Gamepads[i].Start) {}
/*         if (Gamepads[i].Buttons[4]) {
            players[i].height = 20
            players[i].width = 20
        } else if (Gamepads[i].Buttons[5]) {
            players[i].height = 80
            players[i].width = 80
        } else {
            players[i].height = 50
            players[i].width = 50
        } */
		
    }
/* 	Coin.update() */
	
/* 	moveP1()
	moveP2() */
	
/* 	touchP1()
	touchP2() */
	coinHitbox()
	
/* 	P1.newPos()
	P2.newPos()
	Coin.newPos() */
	BackGroundMove()
	
	GameOver()
	
	if (!document.hasFocus()) {
		togglePause()
	}
}

/* function touchP1() {
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
} */

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

/* function PlatformHitbox() {
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
} */

/* function moveP1() {
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
} */

function GameOver() {
	if (dead) {
		clearInterval(game)
		gameRunning = false
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		document.getElementById("body").style = "background: #00dd00;"
		BackGround1.update()
		BackGround2.update()
		ctx.font = "150px 'Press Start 2P', cursive";
		ctx.fillStyle = "#ff0000";
		ctx.textAlign = "center";
		if (scoreP1 > scoreP2) {
			ctx.fillStyle = "blue";
			ctx.fillText("Blue Wins", canvas.width/2, canvas.height/2);
			
			P1.height = 250
			P1.width = 250
			P1.x = 320
			P1.y = 900 - P1.height
			
			Coin.height = 150
			Coin.width = 150
			Coin.x = 1200
			Coin.y = 900 - Coin.height
			
			ctx.font = "40px 'Press Start 2P', cursive";
			ctx.fillStyle = "blue";
			ctx.textAlign = "center";
			ctx.fillText("Score: "+scoreP1, Coin.x+Coin.width/2, Coin.y-10);
			
			P1.update()
			Coin.update()
			Platform5.update()
			
		} else if (scoreP2 > scoreP1) {
			ctx.fillStyle = "#ff0000";
			ctx.fillText("Red Wins", canvas.width/2, canvas.height/2);
			
			P2.height = 250
			P2.width = 250
			P2.x = 320
			P2.y = 900- P2.height
			
			Coin.height = 150
			Coin.width = 150
			Coin.x = 1200
			Coin.y = 900- Coin.height
			
			ctx.font = "40px 'Press Start 2P', cursive";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("Score: "+scoreP2, Coin.x+Coin.width/2, Coin.y-10);
			
			P2.update()
			Coin.update()
			Platform5.update()
			
		} else if (scoreP1 === scoreP2) {
			ctx.fillStyle = "#ffffff";
			ctx.fillText("Draw", canvas.width/2, canvas.height/2);
			
			Platform5.update()
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
	Coin.y = Math.floor(Math.random() * canvas.height-Coin.height-500)
	
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
	ctx.fillText(MM+space1+SS+space2+mm, canvas.width/2, canvas.height/2-180)
}




// Start
var color = 0

function clickMe() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.font = "70px 'Press Start 2P', cursive";
	ctx.fillStyle = "hsl(" + color + ", 100%, 50%)";
	ctx.textAlign = "center";
	ctx.fillText("Click to start", canvas.width/2, canvas.height/2);
	
	color++
	if (color == 360) {
		color = 0
	}
}


document.body.style = "background-color: #000;"
canvas.style = "background-color: #000;"



var miniMenu
var game
var menu
var controllers

canvas.height = window.innerHeight

var press = setInterval(clickMe, 10)

function start() {
	clearInterval(press)
	canvas.height = 1080
	document.body.style = "background-color: #83FFFB;"
	canvas.style = "background-color: #83FFFB;"
	document.removeEventListener("click", start)
	openFullscreen()
	
	GamepadConnect()
	menu = setInterval(drawMenu, 10);
	MenuMusic.play()
	controllers = setInterval(GamepadUpdate, 10)
	document.addEventListener("click", GameStart, false)
	document.addEventListener("keydown", keyDownHandler, false)
	document.addEventListener("keyup", keyUpHandler, false)
	
}



//MenuMusic.play()

var gameLoop;

var Ring = class {
    constructor(props){
        this.canvas = document.createElement("canvas");
        this.canvas.id = props.id;
        this.x = props.x;
        this.y = props.y;
        this.canvas.width = props.width;
        this.canvas.height = props.height;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = this.y + "px";
        this.canvas.style.left = this.x + "px";
        document.body.appendChild(this.canvas);
    }

    drawRing(){
        this.ctx = this.canvas.getContext("2d");
        let ringDimensions = 500;
        let ringX = this.canvas.width/2 - ringDimensions/2;
        let ringY = this.canvas.height/2 - ringDimensions/2;
        let poleDistance = 60;
        this.ctx.fillStyle = "#2029a5";
        this.ctx.fillRect(ringX, ringY, ringDimensions, ringDimensions);
        this.ctx.beginPath();
        this.ctx.moveTo(ringX, ringY);
        this.ctx.lineTo(ringX-poleDistance, 20);
        this.ctx.moveTo(ringX + ringDimensions, ringY);
        this.ctx.lineTo(ringX + ringDimensions + poleDistance, 20);
        this.ctx.moveTo(ringX, ringY + ringDimensions);
        this.ctx.lineTo(ringX - poleDistance, this.canvas.height - 20);
        this.ctx.moveTo(ringX + ringDimensions, ringY + ringDimensions);
        this.ctx.lineTo(ringX + ringDimensions + poleDistance, this.canvas.height - 20);
        this.ctx.closePath();
        this.ctx.strokeStyle = "#442d02";
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(ringX - 20, poleDistance, ringDimensions+40, ringDimensions + 40);
        this.ctx.strokeRect(ringX - 40, poleDistance - 20, ringDimensions + 80, ringDimensions + 80);
        this.ctx.strokeRect(ringX - 60, poleDistance - 40, ringDimensions + 120, ringDimensions + 120);
        this.drawPublic();
        this.drawJury();
        return this;
    }

    drawPublic(){
        let ctx1 = this.ctx;
        let skinColors = ["#361b02", "#f1ac6a", "#daab2a"];
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, 125, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(125, 0);
        this.ctx.lineTo(125, this.canvas.height);
        this.ctx.moveTo(160, 0);
        this.ctx.lineTo(160, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(120, 0, 155-120, this.canvas.height);
        this.ctx.stroke();
        this.ctx.lineWidth = 5;
        let headRadius = 20;
        let iter = 1;
        for (let i = headRadius; i < 140 - headRadius; i+=headRadius*2) {
            for(let j = headRadius; j < this.canvas.height+40; j+=headRadius*2){
                this.ctx.fillStyle = skinColors[parseInt(Math.random()*skinColors.length)];
                this.ctx.beginPath();
                if(iter%2 == 0){
                    this.ctx.arc(i, j-headRadius, headRadius, 0, Math.PI*2);
                }
                else{
                    this.ctx.arc(i, j, headRadius, 0, Math.PI*2);
                }
                this.ctx.closePath();
                this.ctx.stroke();
                this.ctx.fill();
            }
            iter++;
        }      
        let imgs = [new Image()];
        imgs[0].src = "Images/nintendo.png";
        imgs[0].onload = () => {
            ctx1.drawImage(imgs[0], 125, 50, 35, 125);
        }
        imgs[1] = new Image();
        imgs[1].src = "Images/audi.png";
        imgs[1].onload = () => {
            ctx1.drawImage(imgs[1], 125, 250, 35, 125);
        } 
        imgs[2] = new Image();
        imgs[2].src = "Images/riot.png";
        imgs[2].onload = () => {
            ctx1.drawImage(imgs[2], 125, 450, 35, 125);
        }
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(845, 30, 150, 100);
        this.ctx.fillStyle = "black";
        this.ctx.fillText("FREE PUBLICITY SPACE", 850, 70);
        this.ctx.fillText("CALL 555-555-555 FOR RENT.", 850, 90);
        return this;
    }

    drawJury(){
        let skinColors = ["#361b02", "#f1ac6a", "#daab2a"];
        let headRadius = 20;
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(850, 150, 100, 400);   
        for(let i = 190; i < 570; i += 80){
            this.ctx.fillStyle = skinColors[parseInt(Math.random()*skinColors.length)];
            this.ctx.beginPath();
            this.ctx.arc(910+headRadius*3, i, headRadius, 0, Math.PI*2);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fill();
        } 
    } 
}


var MainMenu = class{
    constructor(props, background){
        this.container = document.createElement("div");
        this.background = background;
        this.background.drawRing();
        this.canvas = document.createElement("canvas");
        this.container.style.position = "absolute";
        this.container.style.left = background.x + "px";
        this.container.style.top = background.y + "px";
        this.container.style.width = background.canvas.width + "px";
        this.container.style.height = background.canvas.height + "px";
        this.canvas.width = props.width;
        this.canvas.height = props.height;
        this.ctx = this.canvas.getContext("2d");
        this.container.appendChild(this.canvas);
        document.body.appendChild(this.container);
        this.startButton = document.createElement("canvas");
        this.quitButton = document.createElement("canvas");
        this.drawMenu();
    }

    drawMenu(){
        this.ctx.font = "100px consolas";
        this.ctx.lineJoin = "round";
        this.ctx.strokeStyle = "green";
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 5;
        var x = 330;
        var y = 70 ;
        this.ctx.strokeText("ATARI", x, y);
        this.ctx.fillText("ATARI", x, y);
        this.ctx.strokeStyle = "red";
        this.ctx.strokeText("BOXING", x + 50, y + 80);
        this.ctx.fillText("BOXING", x + 50, y + 80);
        this.ctx.stroke();
        this.setProperties({
            x: x + 130,
            y: y + 200,
            width: 140,
            height: 50
        }, this.startButton);
        this.setProperties({
            x: x + 140,
            y: y + 300,
            width: 110,
            height: 50,
        }, this.quitButton);
        MainMenu.ctx1 = this.startButton.getContext("2d");
        MainMenu.ctx2 = this.quitButton.getContext("2d");
        MainMenu.ctx1.fillText("START", 0, 40);
        MainMenu.ctx2.fillText("QUIT", 0, 40);
        this.startButton.onmouseover = () => {
            MainMenu.ctx1.clearRect(0, 0, this.startButton.width, this.startButton.height);
            MainMenu.ctx1.fillStyle = "red";
            MainMenu.ctx1.fillText("START", 0, 40);    
        };
        this.startButton.onmouseout = () => {
            MainMenu.ctx1.clearRect(0, 0, this.startButton.width, this.startButton.height);
            MainMenu.ctx1.fillStyle = "black";
            MainMenu.ctx1.fillText("START", 0, 40);    
        };
        this.quitButton.onmouseover = () => {
            MainMenu.ctx2.clearRect(0, 0, this.startButton.width, this.startButton.height);
            MainMenu.ctx2.fillStyle = "red";
            MainMenu.ctx2.fillText("QUIT", 0, 40);    
        };
        this.quitButton.onmouseout = () => {
            MainMenu.ctx2.clearRect(0, 0, this.startButton.width, this.startButton.height);
            MainMenu.ctx2.fillStyle = "black";
            MainMenu.ctx2.fillText("QUIT", 0, 40);    
        };
        this.quitButton.onclick = () => {
            window.close();
        }
        this.startButton.onclick = () => {
            this.container.remove();
            initializeGame();
        }
    }

    setProperties(props, element){
        element.style.position = "absolute";
        element.style.top = props.y + "px"
        element.style.left = props.x + "px";
        element.width = props.width;
        element.height = props.height;
        element.getContext("2d").font = "50px consolas";
        this.container.appendChild(element);     
    }
}

propsRing = {
    id: "ring",
    x: window.screen.width/2 - 500,
    y: 0,
    width: 1000,
    height: 664
}
var box = new Ring(propsRing);
var menu = new MainMenu(propsRing, box);
var scoreBoard = new Marker(menu.background);

var audioOw = new Audio("Sounds/ow.wav");
audioOw.volume = 0.3;
var audioPunch1 = new Audio("Sounds/punch.3gpp");
var audioPunch2 = new Audio("Sounds/punch.3gpp");
audioPunch1.playbackRate = 3;
audioPunch2.playbackRate = 3;



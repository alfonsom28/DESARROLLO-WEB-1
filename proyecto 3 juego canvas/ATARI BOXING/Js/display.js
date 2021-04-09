var Digits = class {
    constructor(){
        this.canvas1 = document.createElement("canvas");
        this.canvas2 = document.createElement("canvas");
        this.ctx1 = this.canvas1.getContext("2d");
        this.ctx2 = this.canvas2.getContext("2d");
    }
    
    initialize(){
        this.canvas1.width = 300;
        this.canvas1.height = 480;
        this.canvas1.style.backgroundColor = "black";
        this.canvas2.width = 300;
        this.canvas2.height = 480;
        this.canvas2.style.backgroundColor = "black";
        return this;
    }

    drawNumber(toDraw) {
        var numbersToDraw = toDraw + "";
        var code = ["1111110","0110000","1101101","1111001","0110011","1011011","1011111",
        "1110000","11111111","1111011","0000000"];
        for(let i = 0; i < numbersToDraw.length; i++){
            var ctx;
            if(numbersToDraw.length > 1){
                ctx = this.ctx1;
                if(i == 1){
                    ctx = this.ctx2;
                }
            }
            else{
                this.drawNumber("p"+numbersToDraw);
                return;
            }
            ctx.fillStyle = "black";
            ctx.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            ctx.fillRect(0, 0, this.canvas1.width, this.canvas1.height);
            var codeToUse;
            if(numbersToDraw.charAt(i) == 'p'){
                codeToUse = code[10];
            }
            else{
                codeToUse = code[parseInt(numbersToDraw.charAt(i))];
            }
            for(let j = 0; j < codeToUse.length; j++){
                let binary = codeToUse.charAt(j);
                ctx.fillStyle = "white";
                if(binary == '0'){
                    ctx.fillStyle = "rgba(250,250,250,0.1)";
                }
                switch (j) {
                    case 0:   
                        ctx.fillRect(50, 30, 200, 20);
                        break;
                    case 1:   
                        ctx.fillRect(this.canvas1.width - 40, 60, 20, 160);
                        break;
                    case 2:   
                        ctx.fillRect(this.canvas1.width - 40, 260, 20, 160);
                        break;
                    case 3:   
                        ctx.fillRect(50, this.canvas1.height - 50, 200, 20);
                        break;
                    case 4:   
                        ctx.fillRect(20, 260, 20, 160);
                        break;
                    case 5:
                        ctx.fillRect(20, 60, 20, 160);
                        break;
                    case 6:
                        ctx.fillRect(50, 230, 200, 20);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

var Marker = class {
    constructor(ring){
        this.digits1 = new Digits().initialize();
        this.digits2 = new Digits().initialize();       
        this.canvas = document.createElement("canvas");
        this.canvas.width = 218;
        this.canvas.height = 100;
        this.ctx = this.canvas.getContext("2d");
        this.ps1Score = 0;
        this.ps2Score = 0;
        this.ring = ring;
    }

    initializeMarker(){
        this.ctx.fillStyle = "white";
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "green";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeRect(0, 0, this.canvas.width/2-5, this.canvas.height);
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.canvas.width/2+5, 0, this.canvas.width/2-5, this.canvas.height);  
        return this;
    }

    drawScores(ps1Score, ps2Score){
        this.initializeMarker();
        this.digits1.drawNumber(ps1Score);
        this.digits2.drawNumber(ps2Score);
        this.ctx.drawImage(this.digits1.canvas1, 3, 3, 50, 95);
        this.ctx.drawImage(this.digits1.canvas2, 53, 3, 50, 95);
        this.ctx.drawImage(this.digits2.canvas1, 115, 3, 50, 95);
        this.ctx.drawImage(this.digits2.canvas2, 165, 3, 50, 95);
        this.ring.ctx.clearRect(400-18, 0, this.canvas.width, this.canvas.height);
        this.ring.ctx.drawImage(this.canvas, 400-18, 0);
    }
}




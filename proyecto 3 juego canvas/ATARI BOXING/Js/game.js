var col;
const bell = new Audio("Sounds/bell.wav");
bell.volume = 0.8;

const initializeGame = ()=>{
    bell.play();
    col = new Player(box);
    col.inicio().drawPlayer();
    
    document.body.appendChild(col.container);
    window.addEventListener("keydown",(e)=>{
        //console.log(e.code);
        col.keyPressed.set(e.code, true);
    });
    window.addEventListener("keyup",(e)=>{ 
        col.keyPressed.set(e.code, false);        
    })
    gameLoop = requestAnimationFrame(gameLooping);
}

const gameLooping = ()=> {
    col.drawPlayer();
    checkForHit();
    scoreBoard.drawScores(col.jugador[0].score, col.jugador[1].score);
    gameLoop = requestAnimationFrame(gameLooping);
    checkForWin();
}

const checkForHit = ()=> {
    //console.log(col.jugador[1].isPunching)
    if(((col.brazoVerde.y + 30/2 - 5 >= col.jugador[1].y
        && col.brazoVerde.y + 30/2 - 5 <= col.jugador[1].y + 50) 
        || (col.brazoVerde.y + 30/2 - 5 + 80 >= col.jugador[1].y
        && col.brazoVerde.y + 30/2 - 5 + 80 <= col.jugador[1].y + 50))
        && col.brazoVerde.x + col.brazoVerde.width >= col.jugador[1].x + 10
        && col.brazoVerde.x + col.brazoVerde.width <= col.jugador[1].x + col.jugador[1].width
        && col.jugador[0].isPunching){
        if(!col.jugador[1].beingHit){
            setTimeout(() => {
                col.jugador[1].beingHit = false;
            }, 1000);
            col.jugador[0].score += 5;
            audioOw.play();
            audioPunch1.play();
        }
        col.jugador[1].beingHit = true;
    }
    if(((col.brazoRojo.y + 30/2 - 5 >= col.jugador[0].y
        && col.brazoRojo.y + 30/2 - 5 <= col.jugador[0].y + 50) 
        || (col.brazoRojo.y + 30/2 - 5 + 80 >= col.jugador[0].y
        && col.brazoRojo.y + 30/2 - 5 + 80<= col.jugador[0].y + 50))
        && col.brazoRojo.x <= col.jugador[0].x + col.jugador[0].width - 20
        && col.brazoRojo.x >= col.jugador[0].x - 45
        && col.jugador[1].isPunching){
        if(!col.jugador[0].beingHit){
            setTimeout(() => {
                col.jugador[0].beingHit = false;
            }, 1000);
            col.jugador[1].score += 5;
            audioOw.play();
            audioPunch2.play();
        }
        col.jugador[0].beingHit = true;
    }
}


var resetBtn = document.createElement("button");
var resetBtnDiv = document.createElement("div");
resetBtnDiv.style.position = "absolute";
resetBtnDiv.style.top = "100px";
resetBtnDiv.style.left = "425px";
resetBtnDiv.style.width = "150px";
resetBtnDiv.style.height = "50px";
resetBtn.innerHTML = "PLAY AGAIN";
resetBtn.style.height = "50px";
resetBtn.style.width = "150px";
resetBtnDiv.appendChild(resetBtn);
resetBtn.onclick = ()=>{
    col.container.remove();
    resetBtnDiv.remove();
    nuclear.removeExplosion();
    initializeGame();
}

function nuclearExplosion(){
    this.nuclearEx = new Image();
    this.nuclearEx.src = "Images/nuclear.gif";
    this.nuclearEx.style.width = "70px";
    this.nuclearEx.style.height = "70px";
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.width = "70px";
    this.container.style.height = "70px";
    this.container.appendChild(this.nuclearEx);
    this.exp = new Audio("Sounds/explosion.wav");
    this.addExplosion = (x, y)=>{
        document.getElementById("perrosucio").appendChild(this.container);
        this.container.style.left = x - 10 + "px";
        this.container.style.top = y - 10 + "px";
        this.exp.play();
    }
    this.removeExplosion = ()=>{
        this.container.remove();
    } 
}

const nuclear = new nuclearExplosion();

const checkForWin = ()=>{
    if(col.jugador[0].score >= 100 || col.jugador[1].score >= 100){
        if(col.jugador[0].score >= 100){
            col.jugador[0].win();
            col.brazoRojo.canvas.getContext("2d").clearRect(0, 0, col.brazoRojo.canvas.width, col.brazoRojo.canvas.height);
            nuclear.addExplosion(col.jugador[1].x, col.jugador[1].y)
        }
        else if(col.jugador[1].score >= 100){
            col.jugador[1].win();
            col.brazoVerde.canvas.getContext("2d").clearRect(0, 0, col.brazoRojo.canvas.width, col.brazoRojo.canvas.height);
            nuclear.addExplosion(col.jugador[0].x, col.jugador[0].y)
        }
        cancelAnimationFrame(gameLoop);
        setTimeout(() => {
            document.body.appendChild(resetBtnDiv);
        }, 3000);
    }
}


var Player = class {
    constructor(box){
        this.canvas = document.createElement("canvas");
        this.container = document.createElement("div");
        this.brazoVerde = {
            canvas: document.createElement("canvas"),
            x: 0, y: 0, height: 110, width: 90, punching: 0
        };
        this.brazoRojo = {
            canvas: document.createElement("canvas"),    
            x: 0, y: 0, height: 110, width: 90, punching: 0
        };
        this.container.style.position = "absolute";
        this.container.id = "perrosucio";
        this.container.style.top = box.y + "px";
        this.container.style.left = box.x + "px";
        this.container.style.width = box.canvas.width + "px";
        this.container.style.height = box.canvas.height + "px";
        this.container.appendChild(this.canvas);
        this.container.appendChild(this.brazoRojo.canvas);
        this.container.appendChild(this.brazoVerde.canvas);
        var keys = [];
        this.keyPressed = new Map(keys);
        this.ctx = this.canvas.getContext("2d");
        this.jugador =[];
    }  

    inicio(){     
        //console.log(this.x)
        console.log(this.container.offsetLeft);
        this.canvas.width = 1000;
        this.canvas.height = 664;
        this.canvas.id = "perro";
        this.canvas.style.position = "absolute";

        this.brazoRojo.canvas.width = 90;
        this.brazoRojo.canvas.style.position = "absolute";
        this.brazoVerde.canvas.style.position = "absolute";
        this.brazoVerde.canvas.style.left = "300px";
        console.log(this.brazoVerde.canvas.offsetLeft);
        this.brazoRojo.canvas.height = 110;
        this.brazoVerde.canvas.width = 90;
        this.brazoVerde.canvas.height = 110;
        this.brazoRojo.ctx = this.brazoRojo.canvas.getContext("2d");
        this.brazoVerde.ctx = this.brazoVerde.canvas.getContext("2d");
        this.brazoRojo.ctx.fillStyle = "#f00";
        this.brazoRojo.ctx.fillRect(10, 0, 90, 30);
        this.brazoRojo.ctx.fillRect(10, 80, 90, 30);
        this.brazoVerde.ctx.fillStyle = "#0f0";
        this.brazoVerde.ctx.fillRect(10, 0, 90, 30);
        this.brazoVerde.ctx.fillRect(10, 80, 90, 30);

        this.jugador.push({
            x:350,y:300,
            width:50, height:50,
            color: '#0f0', //verde
            beingHit: false, isPunching: false,
            score: 0, jumpCd: false, punchCd: false,
            win: ()=>{
                this.ctx.fillStyle = '#0f0';
                this.ctx.font = "50px consolas";
                this.ctx.fillText("GREEN WINS", 370, 200);
            }
        });
        
        this.jugador.push({
            x:600,y:300,
            width:50, height:50,
            color: '#f00', //rojo
            beingHit: false, isPunching: false,
            score: 0, jumpCd: false, punchCd: false,
            win: ()=>{
                this.ctx.fillStyle = "#f00";
                this.ctx.font = "50px consolas";
                this.ctx.fillText("RED WINS", 370, 200);
            }
        });
        return this;
        
    }

    drawPlayer(){
        var ctx1 = this.ctx;
       // console.log(ctx1);
        var jugador = this.jugador;
        var keyPressed = this.keyPressed;
        var punchSpeed = 20;
        jugador[0].isPunching = false;
        jugador[1].isPunching = false;

        const actualizar = () =>{
            var velocity1 = 1;
            var velocity2 = 1;
            ctx1.clearRect(0, 0, 750, 582);
            var ringDimensions = 500;
            var poleDistance = 60;
            var ringX = 1000/2 - ringDimensions/2;
            var ringY = 664/2 - ringDimensions/2;
            //Movimiento jugador 1
            
            if(keyPressed.get("KeyG")){
                if(!jugador[0].jumpCd){
                    velocity1 = 150;
                    jugador[0].jumpCd = true;
                    setTimeout(() => {
                        jugador[0].jumpCd = false;
                    }, 5000);
                }    
            }   

            const moverderecha1 = ()=>{
                if(jugador[0].x + jugador[0].width < 750){
                    jugador[0].x += velocity1;
                }     
            }

            const moverizquierda1 = ()=>{
                if(jugador[0].x > 250){
                    jugador[0].x -= velocity1;
                }          
            }

            const moverarriba1 = ()=>{
                jugador[0].y -= velocity1;     
            }

            const moverabajo1 = ()=>{
                jugador[0].y += velocity1;
            }

            //Movimiento jugador 2

            
            if(keyPressed.get("NumpadDecimal")){
                if(!jugador[1].jumpCd){
                    velocity2 = 150;
                    jugador[1].jumpCd = true;
                    setTimeout(() => {
                        jugador[1].jumpCd = false;
                    }, 5000);
                }    
            }  

            const moverderecha2 = () =>{
                if(jugador[1].x + jugador[1].width < 750){
                    jugador[1].x += velocity2;
                }             
            }

            const moverizquierda2 = ()=>{
                if(jugador[1].x > 250){
                    jugador[1].x -= velocity2;
                }  
            }

            const moverarriba2 = ()=>{
                jugador[1].y -= velocity2;     
            }

            const moverabajo2 = ()=>{
                jugador[1].y += velocity2;             
            }    
            //console.log(ringX);
            //console.log(ringY);
            //console.log(keyPressed.get("KeyD"));
            if (keyPressed.get("KeyD") && !keyPressed.get("KeyA")){
                moverderecha1();
            }

            if (keyPressed.get("KeyA") && !keyPressed.get("KeyD")){
                moverizquierda1();
            }

            if(keyPressed.get("KeyW") && !keyPressed.get("KeyS")){
                moverarriba1();
            }

            if(keyPressed.get("KeyS") && !keyPressed.get("KeyW")){
                moverabajo1();
            }

            if (keyPressed.get("ArrowRight") && !keyPressed.get("ArrowLeft")){
                moverderecha2();
            }

            if (keyPressed.get("ArrowLeft") && !keyPressed.get("ArrowRight")){
                moverizquierda2();
            }
            

            if(keyPressed.get("ArrowUp") && !keyPressed.get("ArrowDown")){
                moverarriba2();
            }

            if(keyPressed.get("ArrowDown") && !keyPressed.get("ArrowUp")){
                moverabajo2();
            }

            if (keyPressed.get("KeyF") && !jugador[0].punchCd) {
                jugador[0].isPunching = true;
                if(this.brazoVerde.punching < 40){
                    this.brazoVerde.punching += punchSpeed;
                } 
                setTimeout(() => {
                    jugador[0].punchCd = true;
                    setTimeout(() => {
                        jugador[0].punchCd = false;
                    }, 1000);
                }, 150);
            } else {
                this.brazoVerde.punching = 0;
            }

            if(keyPressed.get("Numpad0") && !jugador[1].punchCd){
                jugador[1].isPunching = true;
                if(this.brazoRojo.punching < 50){
                    //speed at which the punch goes
                    this.brazoRojo.punching += punchSpeed;
                }
                setTimeout(() => {
                    jugador[1].punchCd = true;
                    setTimeout(() => {
                        jugador[1].punchCd = false;
                    }, 1000);
                }, 150);   
            }
            else{
                this.brazoRojo.punching = 10;
            }

            for(var i=0;i<jugador.length;i++){

                if(jugador[i].y < 82){ //colision arriba
                    jugador[i].y = 82;
                }
                else if(jugador[i].x < 250){  //colision izquierda
                    jugador[i].x = 250;
                }
                else if(jugador[i].y + jugador[i].height > 582){ //colision abajo
                    jugador[i].y = 582 - jugador[i].height;
                }
                else if(jugador[i].x + jugador[i].width > 750){   //colision derecha
                    jugador[i].x = 750 - jugador[i].width;
                }

                if(jugador[0].x + jugador[0].width > jugador[1].x && 
                    jugador[0].x < jugador[1].x + jugador[1].width &&
                    jugador[0].y < jugador[1].y + jugador[1].height&&
                    jugador[0].y + jugador[0].height > jugador[1].y
                ){
                    //collision code
                }
                //console.log(jugador[0].x);
                ctx1.fillStyle = jugador[i].color;
                ctx1.lineWidth = 10;
                
                ctx1.fillRect(jugador[i].x, jugador[i].y, jugador[i].width, jugador[i].height);
                ctx1.strokeRect(jugador[i].x, jugador[i].y, jugador[i].width, jugador[i].height);
            }
            this.brazoVerde.y = jugador[0].y - 30;
            this.brazoVerde.x = jugador[0].x;
            //console.log(jugador[0].x);
            //console.log(this.brazoVerde.x)
            if (keyPressed.get("KeyF")) {
                this.brazoVerde.x = jugador[0].x + this.brazoVerde.punching;
            }
            
            this.brazoRojo.y = jugador[1].y - 30;
            this.brazoRojo.x = jugador[1].x - 40;
            if(keyPressed.get("Numpad0")){
                //console.log(this.brazoRojoPunching)
                this.brazoRojo.x = jugador[1].x - this.brazoRojo.punching - 30;
            }
            this.brazoVerde.canvas.style.top = this.brazoVerde.y+"px";
            this.brazoVerde.canvas.style.left = this.brazoVerde.x+"px";
            this.brazoRojo.canvas.style.top = this.brazoRojo.y+"px";
            this.brazoRojo.canvas.style.left = this.brazoRojo.x+"px";
        }
        actualizar(jugador);
    }
}


panel = class{
    constructor(){
        this.panel = document.createElement("div");
        
    }
    setProperties(){
        this.panel.style.position = "absolute";
        this.panel.style.left = "100px";
        this.panel.style.top = "100px";
        this.panel.style.width = "200px";
        this.panel.style.height = "50px";
        this.panel.style.backgroundColor = "rgba(100,100,100,0.5)";
        return this;
    }
    show(){
        this.panel.style.display = "block";
        return this;
    }
    hide(){
        this.panel.style.display = "none";
        return this;
    }
    addTobody(){
        document.body.appendChild(this.panel);
        return this;
    }
    mouse(){
        var pmousex, pmousey;
        var x = this.panel;

        x.addEventListener("mousedown",down,false);
        window.addEventListener("mouseup",up,false); 

        function down(event){
            pmousex = event.layerX;
            pmousey = event.layerY;

            window.addEventListener("mousemove", mover,false);
        }

        function mover(event){
            var newx = event.clientX - pmousex;
            var newy = event.clientY - pmousey;
                
            x.style.left = newx + "px";
            x.style.top = newy + "px";
        }

        function up(event){
            window.removeEventListener("mousemove", mover,false);
        }
    }
}
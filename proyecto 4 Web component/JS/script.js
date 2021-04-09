const getStyle = ()=>{
    return `   
    #container{
        width: 700px;
        height: 400px;
        border-radius: 50px;
        background-color: white;
        border-style: outset;
        border-color: orange;
        border-width: 10px;
        text-align: center;
        background-color: black;
        box-shadow: 10px 10px 10px black;
        min-width: 200px;
        min-height: 300px;
        resize: both;
        overflow: hidden;
    }
    .title{
        border-top-left-radius: 710px;
        border-top-right-radius: 710px;
        font-size: 35px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        width: 99%;
        height: 10%;
        border-style: dotted;
        border-color: black;
        text-align: center;
        background-color: aquamarine;
        margin-top: 0%;
        margin-bottom: 0%;
        cursor: move;
    }
    table{
        position: sticky;
        width: 100%;
        height: 77%;
    }
    th{
        height: 20%;
        resize: horizontal;
        overflow: auto;
        text-align: center;
        background-color: olivedrab;
    }
    tr{
        background-color: rosybrown;
    }
    td{
        background-color: inherit;
    }
    textarea{
        width: 100%;
        height: 100%;
        background-color: inherit;
        text-align: center;
        vertical-align: center;
        resize: none;
        overflow: auto;
        border: none;
    }
    #controlPanel{
        border-bottom-right-radius: 700px;
        border-bottom-left-radius: 700px;
        width: 100%;
        height: 11%;
        background-color: grey;
    }
    .control{
        width: 5%;
        height: 80%;
        border: 1px solid grey;
        margin-right: 10px;
        margin-top: 4px;
        cursor: pointer; 
    }

    #pgSelect{
        position: relative;
        display: inline-block;
        width: 15%;
        height: 50%;
        top: -17%;
        float: none;
        left: -5%;      
    }

    #pgNumeric{
        position: absolute;
        width: 50%;
        height: 100%;
        top: 50%;
        left: 50%;
    }

    p{
        position: relative:
        top: 0px;
        left: -10px;
        width: 50%;
    }

    @keyframes highlight{
        from{ border: 1px solid grey}
        to { border: 1px solid cyan}
    }
    .control:hover{
        animation: highlight 1.5s; 
        animation-fill-mode: forwards;    
    }
    #closeBtn{
        outline: none;
        position: absolute;
        border-top-right-radius: 400px;
        height: 10.5%;
        width: 20%;
        max-width: 20%;
        min-width: 5%;
        top: 2.5%;
        right: 10px;
        color: black;
        font-size: 30px;
        text-align: start;
        overflow: hidden;
        
    }
    #closeBtn:hover{
        color: white;
        background-color: tomato;
        transition-duration: 0.1s;
    }`;
}

class Controls extends HTMLElement{
    connectedCallback(){
        this.sR = this.attachShadow({mode: "open"});
        this.render();
        this.addStyle();
    }
    render(){
        const div = document.createElement("div");
        div.id = "controlPanel";
        this.addButtons(div);
        this.sR.appendChild(div);
    }

    addButtons(div){
        var buttons = [];
        const firstBtn = new Image();
        firstBtn.src = "IMAGES/firstBtn.png";
        firstBtn.id = "firstBtn";
        const lastBtn = new Image();
        lastBtn.src = "IMAGES/lastBtn.png";
        const rwdBtn = new Image();
        rwdBtn.src = "IMAGES/rwdBtn.png";
        const fwdBtn = new Image();
        fwdBtn.src = "IMAGES/fwdBtn.png";
        const priorBtn = new Image();
        priorBtn.src = "IMAGES/priorBtn.png";
        const nextBtn = new Image();
        nextBtn.src = "IMAGES/nextBtn.png";
        const p = document.createElement("p");
        p.innerHTML = "PAGE#";
        const pg = document.createElement("div");
        pg.id = "pgSelect";
        const pageSelector = document.createElement("input");
        pageSelector.id = "pgNumeric";
        pageSelector.type = "number";
        pageSelector.value = 1;
        pageSelector.min = 1;
        pageSelector.max = this.table.itemPage.length;
        pg.appendChild(p);
        pg.appendChild(pageSelector);
        div.appendChild(pg);
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "X";
        closeBtn.id = "closeBtn";
        this.table.sR.getElementById("container").appendChild(closeBtn);
        buttons.push(firstBtn);
        buttons.push(rwdBtn);
        buttons.push(priorBtn);
        buttons.push(nextBtn);
        buttons.push(fwdBtn);
        buttons.push(lastBtn);
        buttons.forEach(button => {
            button.classList.add("control");
            div.appendChild(button);
        }); 
        this.addEvents(buttons, pageSelector, closeBtn);    
    }

    addEvents(buttons, pageSelector, closeBtn){
        this.table.sR.getElementById("container").addEventListener("resize",(e)=>{
            
            console.log("hello")
        })
        closeBtn.addEventListener("click",(e)=>{
            this.table.remove();
        })
        pageSelector.addEventListener("keyup",(e)=>{
            if(e.key == "Enter"){
                this.movePage(pageSelector.value-1);
            }
        })
        buttons.forEach(control => {
            control.onmousedown = 
            control.addEventListener("mousedown",(e)=>{
                e.preventDefault();
                document.body.addEventListener("click",()=>{
                    control.style.transform = "translateY(0px)";
                })
                control.style.transform = "translateY(2px)"
            });      
        });
        buttons[0].addEventListener("click",(e)=>{
            this.movePage(0);
            let row = this.table.sR.getElementById("r0");
            this.selectRow(row);
        })
        buttons[1].addEventListener("click",(e)=>{
            if(this.table.currentPage != 0){
                this.movePage(--this.table.currentPage);
                let row = this.table.sR.getElementById(`r${this.table.itemPage[this.table.currentPage][0].registryPos}`);
                this.selectRow(row);
            }        
        })
        buttons[2].addEventListener("click",(e)=>{
            if (this.table.currentPage != 0 
                && this.table.selectedRow == this.table.currentPage * this.table.pageSize) {
                this.movePage(--this.table.currentPage);
                let row = this.table.sR.getElementById(`r${this.table.itemPage[this.table.currentPage][this.table.pageSize-1].registryPos}`);
                this.selectRow(row);
            } else if(this.table.selectedRow != 0){
                let row = this.table.sR.getElementById(`r${this.table.selectedRow - 1}`);
                this.selectRow(row);
            }   
        })
        buttons[3].addEventListener("click",(e)=>{
            if (this.table.currentPage != this.table.itemPage.length + 1
                && this.table.selectedRow == this.table.currentPage*this.table.pageSize + this.table.pageSize - 1) {
                this.movePage(++this.table.currentPage);
                let row = this.table.sR.getElementById(`r${this.table.itemPage[this.table.currentPage][0].registryPos}`);
                this.selectRow(row);
            } else if(this.table.selectedRow != this.table.numberOfRegistrys - 1){
                let row = this.table.sR.getElementById(`r${this.table.selectedRow +1}`);
                this.selectRow(row);
            }   
        })
        buttons[4].addEventListener("click",(e)=>{
            if(this.table.currentPage != this.table.itemPage.length - 1){
                this.movePage(++this.table.currentPage);
                let row = this.table.sR.getElementById(`r${this.table.itemPage[this.table.currentPage][0].registryPos}`);
                this.selectRow(row);
            }  
        })
        buttons[5].addEventListener("click",(e)=>{
            this.movePage(this.table.itemPage.length-1);
            let row = this.table.sR.getElementById(`r${this.table.numberOfRegistrys-1}`);
            this.selectRow(row);
        })
        for (const key in this.table.registrys) {     
            let register = this.table.registrys[key];
            if(register.registryPos % this.table.pageSize == 0 && register.registryPos != 0){
                break;
            }
            let row = this.table.sR.getElementById(`r${register.registryPos}`);      
            row.addEventListener("click",(e)=>{
                this.selectRow(row);
            });   
        }  
        this.selectRow(this.table.sR.getElementById(`r0`));
    }  

    selectRow(row){
        let i = this.table.currentPage * this.table.pageSize;
        for (let j = i ; j < i  + this.table.itemPage[this.table.currentPage].length; j++) {
            this.table.sR.getElementById(`r${j}`).style.backgroundColor = "rosybrown";           
        }
        row.style.backgroundColor = "aqua";
        this.table.selectedRow = parseInt(row.id.replace("r",""));
    }

    movePage(itemPage){
        this.table.currentPage = itemPage;
        this.sR.getElementById("pgNumeric").value = this.table.currentPage + 1;
        var tableHtml = "";
        var tableHeaders = "<tr>";
        for (const column in this.table.headers) {
            tableHeaders = tableHeaders.concat(`<th>${this.table.headers[column]}</th>`);
        }
        tableHeaders = tableHeaders.concat("</tr>");
        this.table.itemPage[itemPage].forEach(register => {
            tableHtml = tableHtml.concat(`<tr id=r${register.registryPos}>`);
            for (const data in register) {    
                if (data != "registryPos") {
                    tableHtml = tableHtml.concat(`<td><textarea>${register[data]}</textarea></td>`);     
                }
            }
            tableHtml = tableHtml.concat("</tr>"); 
        });    
        this.table.sR.getElementById("table").innerHTML = tableHeaders + tableHtml;
        for (const key in this.table.itemPage[itemPage]) {     
             
            let register = this.table.itemPage[itemPage][key];
            //console.log(register.registryPos-this.table.pageSize*this.table.currentPage);
            if(register.registryPos % this.table.pageSize == 0 && register.registryPos-this.table.pageSize*this.table.currentPage!= 0){
                break;
            }
            let row = this.table.sR.getElementById(`r${register.registryPos}`); 
                
            row.onclick = (e)=>{
                this.selectRow(row);  
            } 
        }
    }

    addStyle(){
        const styleTag = document.createElement("style");
        styleTag.textContent = getStyle();
        this.sR.appendChild(styleTag);
    }
}

class Grid extends HTMLElement {
    connectedCallback(){
        this.sR = this.attachShadow({mode: "open"});
        this.title = this.getAttribute("title");
        this.headers = headers;
        this.registrys = registrys.register;
        this.currentPage = 0;
        this.itemPage = [[]];
        this.pageSize = pageSize;
        this.selectedRow = 0;
        this.numberOfRegistrys = 0;
        this.render();
        this.addStyle();
    }
    render(){
        const div = document.createElement("div");
        div.id = "container";
        this.sR.appendChild(div);
        this.addTitle(div);
        this.numberOfRegistrys = this.createTable(div);
        this.addControls(div);
    }

    addTitle(div){
        var oldX, oldY;
        const title = document.createElement("h1");
        title.classList.add("title");
        title.textContent = this.title;
        const moveDiv = (e)=>{
            e = e || window.event;
            e.preventDefault();
            var newY = oldY - e.clientY;
            var newX = oldX - e.clientX;
            oldY = e.clientY;
            oldX = e.clientX;
            this.style.top = (this.offsetTop - newY) + "px";
            this.style.left = (this.offsetLeft - newX) + "px";
        }

        const dragOff = ()=>{
            title.removeEventListener("mousemove", moveDiv);
            title.removeEventListener("mouseup", dragOff);
            document.body.removeEventListener("mousemove", moveDiv);
        }
        const dragOn = (e)=>{
            e = e || window.event;
            e.preventDefault();
            oldY = e.clientY;
            oldX = e.clientX;
            title.addEventListener("mousemove", moveDiv);
            document.body.addEventListener("mousemove", moveDiv);
            title.addEventListener("mouseup", dragOff);
            document.body.addEventListener("mouseup", dragOff);
        };
        title.addEventListener("mousedown", dragOn);
        div.appendChild(title);
    }

    createTable(div){
        const table = document.createElement("table");
        div.appendChild(table);
        var tableHtml = "";
        var tableHeaders = "<tr>";
        for (const column in this.headers) {
            tableHeaders = tableHeaders.concat(`<th>${this.headers[column]}</th>`);
        }
        tableHeaders = tableHeaders.concat("</tr>");
        var position = 0;
        var pageNmbr = 0;
        
        for(const key in this.registrys) {      
            if (position%this.pageSize == 0 && position!=0) {
                pageNmbr++;
                this.itemPage[pageNmbr] = []; 
            }
            let register = this.registrys[key];  
            this.registrys[key].registryPos = position;
            this.itemPage[pageNmbr].push(register);
            //console.log(pageNmbr,position);      
            position++;  
        };
        this.itemPage[this.currentPage].forEach(register => {
            tableHtml = tableHtml.concat(`<tr id=r${register.registryPos}>`);
            for (const data in register) {    
                if (data != "registryPos") {
                    tableHtml = tableHtml.concat(`<td><textarea>${register[data]}</textarea></td>`);     
                }
            }
            tableHtml = tableHtml.concat("</tr>"); 
        });    
        table.innerHTML = tableHeaders + tableHtml;
        table.id = "table";
        return position;
    }

    addStyle(){
        const styleTag = document.createElement("style");
        styleTag.textContent = getStyle();
        this.sR.appendChild(styleTag);
    }
    
    addControls(div){
        const controlsTag = document.createElement("grid-controls");
        controlsTag.table = this;
        div.appendChild(controlsTag);
    }
}

try {
        customElements.define("grid-table", Grid)
        customElements.define("grid-controls", Controls);
  } catch (err) {
        console.log(err);
        const h3 = document.createElement('h3')
        h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
        document.body.appendChild(h3)
  }
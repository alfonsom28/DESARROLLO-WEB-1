var URL = "https://localhost:3000/" ;   //url de el servidor al crear el servlet

function suma(){
	let p1=document.getElementById("x").value;
    let p2=document.getElementById("y").value;
    let data = {
        x:p1,
        y:p2,
        op:"+"
    }
        
    fetch(URL, {mode: "cors", method:"POST", body:JSON.stringify(data), headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
    })})
        .then(response=>response.json()) 
        .catch(error=>console.error("Error",error))
        .then(datos=>document.getElementById("txt").value = datos.resultado);
	}

function resta(){
	let p1=document.getElementById("x").value;
    let p2=document.getElementById("y").value;
	let data = {
        x:p1,
        y:p2,
        op:"-"
    }
        
    fetch(URL, {mode: "cors", method:"POST", body:JSON.stringify(data), headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
    })})
        .then(response=>response.json()) 
        .catch(error=>console.error("Error",error))
        .then(datos=>document.getElementById("txt").value = datos.resultado);
	}

function multiplicacion(){
	let p1=document.getElementById("x").value;
    let p2=document.getElementById("y").value;
	let data = {
        x:p1,
        y:p2,
        op:"*"
    }
        
    fetch(URL, {mode: "cors", method:"POST", body:JSON.stringify(data), headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
    })})
        .then(response=>response.json()) 
        .catch(error=>console.error("Error",error))
        .then(datos=>document.getElementById("txt").value = datos.resultado);
	}
	
function division(){
	let p1=document.getElementById("x").value;
    let p2=document.getElementById("y").value;
	let data = {
        x:p1,
        y:p2,
        op:"/"
    }
        
    fetch(URL, {mode: "cors", method:"POST", body:JSON.stringify(data), headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
    })})
        .then(response=>response.json())
        .catch(error=>console.error("Error",error))
        .then(datos=>document.getElementById("txt").value = datos.resultado);
	}

function borrar(){
    document.getElementById("x").value = " ";
    document.getElementById("y").value = " ";
    document.getElementById("txt").value = " ";
}	
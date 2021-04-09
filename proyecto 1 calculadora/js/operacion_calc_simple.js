//archivo javascript
                             ///////////////////////////////////////////////////////////////////////////////
var click;           //////////Se usa para identificar en que input se colocara el valor de los botones   //
                             //                                                                           //
function click_eventx(){   ////Click en input X:                                                          //
    click = x;               //                                                                           //
    console.log(click)       //                                                                           //
}                            //                                                                           //
                             //                                                                           //
function click_eventy(){   ////Click en input Y:                                                          //
    click = y;               //                                                                           //
    console.log(click)       //                                                                           //
}                            ///////////////////////////////////////////////////////////////////////////////

//var eval = eval("3+5");
//alert(eval);

function add_num7(){//Boton 7
    if(click == x){ //Se usa para comprobar en que input se dio el click
        var n = document.getElementById("btn7").value; //almacena el valor del boton en n (valor nuevo)
        var i = document.getElementById("x").value;    //almacena el valor de x en i (valor anterior)
        document.getElementById("x").value = i + n;    //valor anterior junto valor nuevo

    }
    else{
        var n = document.getElementById("btn7").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num8(){//Boton 8
    if(click == x){
        var n = document.getElementById("btn8").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn8").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num9(){//Boton 9
    if(click == x){
        var n = document.getElementById("btn9").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn9").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num4(){//Boton 4
    if(click == x){
        var n = document.getElementById("btn4").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn4").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num5(){//Boton 5
    if(click == x){
        var n = document.getElementById("btn5").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn5").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num6(){//Boton 6
    if(click == x){
        var n = document.getElementById("btn6").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn6").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num1(){//Boton 1
    if(click == x){
        var n = document.getElementById("btn1").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn1").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num2(){//Boton 2
    if(click == x){
        var n = document.getElementById("btn2").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn2").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num3(){//Boton 3
    if(click == x){
        var n = document.getElementById("btn3").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn3").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_num0(){//Boton 0
    if(click == x){
        var n = document.getElementById("btn0").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btn0").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

function add_nump(){//Boton de punto (.)
    if(click == x){
        var n = document.getElementById("btnp").value;
        var i = document.getElementById("x").value;
        document.getElementById("x").value = i + n;

    }
    else{
        var n = document.getElementById("btnp").value;
        var l = document.getElementById("y").value;
        document.getElementById("y").value = l + n;
    }
}

/*function add_menos(){//Boton negativo                          
    if(click == x){                                
        var i = document.getElementById("x").value;
        document.getElementById("x").value = "-"+i;   //convierte numero anterior en negativo

    }
    else{
        var l = document.getElementById("y").value;
        document.getElementById("y").value = "-"+l;
    }
}*/

function add_menos(){         //boton para cambiar de signo un numero             
    if(click == x){                                
        var d = document.getElementById("x").value[0]; //almacenar posicion 0 del input
        console.log(d)
        if(d == "-"){  //////////////////////////////////// Cambiar de negativo a positivo
            
            var t = document.getElementById("x").value;
            var ts = t.substring(1); /////////////////////// Elimina caracter de posicion 0
            document.getElementById("x").value = ts;
            
            console.log(t)
            console.log(ts)
        }
        else{ ///////////////////////////////////////////// Cambiar de positivo a negativo
            var i = document.getElementById("x").value;  //
            document.getElementById("x").value = "-"+i;  //
        }
    }
    else{
        var d = document.getElementById("y").value[0];
        if(d == "-"){

            var t = document.getElementById("y").value;
            var ts = t.substring(1);
            document.getElementById("y").value = ts;
        }
        else{
            var l = document.getElementById("y").value;
            document.getElementById("y").value = "-"+l;
        }
    }
    
}

function suma(){//////////////////////////////////////Suma
    var p1 = document.getElementById("x").value;
    var p2 = document.getElementById("y").value;
    var r = parseFloat(p1) + parseFloat(p2);
    document.getElementById("txt").value = r;
}

function resta(){/////////////////////////////////////Resta
	var p1 = document.getElementById("x").value;
    var p2 = document.getElementById("y").value;
    var r = parseFloat(p1) - parseFloat(p2);
    document.getElementById("txt").value = r;
}

function multiplicacion(){////////////////////////////Multiplicacion
	var p1 = document.getElementById("x").value;
    var p2 = document.getElementById("y").value;
    var r = parseFloat(p1) * parseFloat(p2);
    document.getElementById("txt").value = r;
}
	
function division(){//////////////////////////////////Division
	var p1 = document.getElementById("x").value;
    var p2 = document.getElementById("y").value;

    p2 = parseFloat(p2);

    if(p2 == 0){                                                   //restriccion de numero divido entre 0
        alert("No es posible dividir entre 0, numero infinito");
        document.getElementById("y").value = " ";
        document.getElementById("txt").value = "error";
    }
    else{
        var r = parseFloat(p1) / p2;
        console.log(r);
        document.getElementById("txt").value = r;
    }
}

function borrar(){ //Boton AC
    document.getElementById("x").value = "";
    document.getElementById("y").value = "";
    document.getElementById("txt").value = "0";
}	
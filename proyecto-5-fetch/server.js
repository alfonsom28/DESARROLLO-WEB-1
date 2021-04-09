const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const app = express();
const options = {   //json con credenciales para protocolo https
    key: fs.readFileSync('ssl/hacksparrow-key.pem'),
    cert: fs.readFileSync('ssl/hacksparrow-cert.pem')
}

app.use(express.static(__dirname + '/public'));   //para incluir los archivos html, js, css dentro de public
app.use(express.json());   //reemplaza bodyparser
app.use(cors({origin:"*"}));

//routes
app.post('/', function(request, response){
    console.log('datos recibidos en post');
    console.log(request.body);
    console.log(request.body.x);
    console.log(request.body.y);

    var p1 = request.body.x;
    var p2 = request.body.y;
    var ope = request.body.op;

    if(ope == '/' & p2 == 0){
        response.status(200).json({"resultado" : "syntax error"});  //status 200 : ok
    }

    var r = eval(p1+ope+p2);

    console.log(r);

    response.status(200).json({"resultado":r});
});

/*app.listen(3000, function(){
    console.log("server is running on port 3000")
});*/

https.createServer(options, app).listen(3000, function(){
    console.log("server https is running on port 3000")
});
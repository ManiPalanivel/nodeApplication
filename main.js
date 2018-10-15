// var http=require('http');
// http.createServer(function(request, response){
// 	response.writeHead(200, {'Content-Type': 'application/json'});
// 	response.end({'test':'test1'});
// }).listen(8081);

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
var http = require('http');
var server = http.createServer(app);

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "data.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// app.use(express.multipart());

app.use(function(req,res,next){
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

server = app.listen(8081, function () {

	server.close(function(){
		server.listen(8001,'172.16.144.148')
// 		var host = server.address().address
//   var port = server.address().port

//   console.log("Example app listening at http://%s:%s", host, port)
	  })
  

})

app.get('/login', function (req, res) {
	fs.readFile( __dirname + "/" + "login.json", 'utf8', function (err, data) {
		console.log( data );
		res.end( data );
	});
 })

 app.get('/abcd', function(req, res) {   
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
 })

 app.get('/', function(req, res) {   
    //res.send("Sorry please provide a valid api");
//   res.json({"status":"failure"});
	res.download(__dirname + "/" + "data.json"); 
})

 app.post('/register', function(req, res) {   
	var name = req.body.name;
	name = "Success Mr./Mrs. "+ name;
    res.send(JSON.stringify({status: name}));
 })

var express 	= require('express');
var	bodyParser 	= require('body-parser');
var path 		= require('path');
var	morgan 		= require('morgan');

var	app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'assets')));  

app.get('/',function(req,res){ 
	res.sendFile(path.join(__dirname + '/layout/index.html'));
});

app.listen(app.get('port'),function(){ 
	console.log("app is listening on port " + app.get('port') )
})
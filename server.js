var express 	= require('express');
var	bodyParser 	= require('body-parser');
var path 		= require('path');
var	morgan 		= require('morgan');

var	app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(require('./controllers'));

app.listen(app.get('port'),function(){ 
	console.log("app is listening on port " + app.get('port') )
})
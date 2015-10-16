var mongoose = require('mongoose')
var url = process.env.MONGOLAB_URL || 'mongodb://localhost/todo'
mongoose.connect(url,function(){
	console.log("mongodb is connectted")
});
module.exports = mongoose
var db = require('../db');
var Item = db.model('Item',{
	text : { type : String , required : true },
	done : { type : Boolean, required : true }
})

module.exports = Item;
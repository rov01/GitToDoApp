var router = require('express').Router();
var Item   = require('../../models/item'); 

router.get('/',function(req,res){
	Item.find()
	.sort('-date')
	.exec(function(err,items){
		if (err) {
			res.json({msg : "something error"})
		}else{
			res.status(200).json(items);
		};
	})

})

router.post('/',function(req,res){
	var item = new Item({
		text : req.body.text,
		done : req.body.done
	});

	item.save(function(err,item){
		if (err) {
			console.log(err);
		 	return res.status(400).json({msg:"save unsuccessful"})
		} else {
			return res.status(200).json(item);
		};
	})
});


module.exports = router;
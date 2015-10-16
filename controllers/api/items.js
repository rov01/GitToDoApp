var router = require('express').Router();
var Item   = require('../../models/item'); 

router.get('/',function(req,res){
	Item.find()
	.sort('-date')
	.exec(function(err,items){
		if (err) {
			return res.status(400).json({msg : "something error"})
		}else{
			return res.status(200).json(items);
		};
	});
});

router.post('/',function(req,res){
	var item = new Item({
		text : req.body.text,
		done : req.body.done
	});

	item.save(function(err,item){
		if (err) {
		 	return res.status(400).json({msg:"save unsuccessfully"})
		} else {
			return res.status(200).json(item);
		};
	});
});

router.put('/:id',function(req,res){
	Item.findOneAndUpdate({
		_id : req.params.id
	},{
		$set : {
			text : req.body.text,
			done : req.body.done
		}
	},function(err,item){
		if (err) {
			return res.status(400).json({msg : "update unsuccessfully"})
		} else {
			return res.status(200).json(item);
		}
	});
});

router.delete('/:id',function(req,res){
	Item.findOneAndRemove({
		_id : req.params.id
	},function(err){
		if (err) {
			return res.status(400).json({msg: "remove unsuccessfully"});
		} else {
			return res.status(200).json({msg : "remove successfully"})
		}
	});
});

module.exports = router;
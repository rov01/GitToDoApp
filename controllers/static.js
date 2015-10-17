var express = require('express');
var path 	= require('path');
var router 	= express.Router();

router.get('/',function(req,res){
	res.render('index');
});

router.use(express.static(path.join(__dirname, '/../assets')));  


module.exports = router;
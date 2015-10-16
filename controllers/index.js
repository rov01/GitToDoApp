var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.use('/api/items',require('./api/items'))
router.use(require('./static'))

module.exports = router
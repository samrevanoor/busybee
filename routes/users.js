var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users')

router.get('/users', usersCtrl.index);

module.exports = router;

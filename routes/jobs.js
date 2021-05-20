var express = require('express');
var router = express.Router();
const jobsCtrl = require('../controllers/jobs')

router.get('/jobs', jobsCtrl.index);

module.exports = router;

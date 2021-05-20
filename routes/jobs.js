var express = require('express');
var router = express.Router();
const jobsCtrl = require('../controllers/jobs')

router.get('/jobs', jobsCtrl.index);
router.get('/jobs/new', jobsCtrl.new);
router.post('/jobs', jobsCtrl.create);
router.get('/jobs/:id', jobsCtrl.show);
router.delete('/jobs/:id', jobsCtrl.delete);

module.exports = router;

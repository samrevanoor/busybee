var express = require('express');
var router = express.Router();
const jobsCtrl = require('../controllers/jobs');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

router.get('/jobs', isLoggedIn, jobsCtrl.index);
router.get('/jobs/new', isLoggedIn, jobsCtrl.new);
router.post('/jobs', isLoggedIn, jobsCtrl.create);
router.get('/jobs/:id', isLoggedIn, jobsCtrl.show);
router.delete('/jobs/:id', isLoggedIn, jobsCtrl.delete);
router.post('/stages', isLoggedIn, jobsCtrl.addStage);


module.exports = router;

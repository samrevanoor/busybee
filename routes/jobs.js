var express = require('express');
var router = express.Router();
const jobsCtrl = require('../controllers/jobs');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

router.get('/jobs', isLoggedIn, jobsCtrl.index);
router.get('/jobs/sort', isLoggedIn, jobsCtrl.sort);
router.get('/jobs/search', isLoggedIn, jobsCtrl.search);
router.get('/jobs/new', isLoggedIn, jobsCtrl.new);
router.get('/jobs/hired', isLoggedIn, jobsCtrl.hired);
router.post('/jobs', isLoggedIn, jobsCtrl.create);
router.get('/jobs/:id/edit', isLoggedIn, jobsCtrl.editJob);
router.get('/jobs/:id', isLoggedIn, jobsCtrl.show);
router.delete('/jobs/:id', isLoggedIn, jobsCtrl.delete);
router.put('/jobs/:id', isLoggedIn, jobsCtrl.updateJob);

module.exports = router;

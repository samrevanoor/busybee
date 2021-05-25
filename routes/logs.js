const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/logs');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

router.post('/jobs/:id/logs', isLoggedIn, logCtrl.create);
// router.delete('/logs/:id', logCtrl.deleteEntry);

module.exports = router;
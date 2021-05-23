const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/logs');

router.post('/jobs/:id/logs', logCtrl.create);
// router.delete('/logs/:id', logCtrl.deleteEntry);

module.exports = router;
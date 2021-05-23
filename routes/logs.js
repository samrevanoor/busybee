const express = require('express');
const router = express.Router();
const logCtrl = require('../controllers/logs');

router.post('/jobs/:id/logs', logCtrl.create);

module.exports = router;
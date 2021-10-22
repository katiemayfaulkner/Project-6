const express = require('express');

// Create router, to which you can register routes
const router = express.Router();

// Controller
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Make router available outside of this file
module.exports = router;
const express = require('express');

// Create router, to which you can register routes
const router = express.Router();

// The order of middleware is important, multer must be after auth (so img is saved before authentication is completed)
const auth = require('../middleware/auth');

// Middleware for handling multimedia data (in this case images)
const multer = require('../middleware/multer.config'); 

// Controller
const sauceCtrl = require('../controllers/sauce')

// Routes 
router.post('', auth, multer, sauceCtrl.createSauce);
router.get( '', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //UPDATE an existing sauce - CRUD
router.delete('/:id', auth, sauceCtrl.deleteSauce); //DELETE a sauce - CRUD
router.post('/:id/like',auth, sauceCtrl.likeSauce);

// Make router available outside of this file
module.exports = router;

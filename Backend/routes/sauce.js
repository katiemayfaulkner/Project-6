const express = require('express');
const router = express.Router(); //creates router to which you can register routes to

//the order of middleware is important, multer must be after auth,
    // multer before auth = img saved before authentication completed
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config'); 

const sauceCtrl = require('../controllers/sauce') //Ctrl = short for controller

router.post('', auth, multer, sauceCtrl.createSauce);
router.get( '', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //UPDATE an existing sauce - CRUD
router.delete('/:id', auth, sauceCtrl.deleteSauce); //DELETE a sauce - CRUD
router.post('/:id/like',auth, sauceCtrl.likeSauce);

module.exports = router; //makes router available outside of this file

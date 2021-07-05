const express = require('express');
const router = express.Router(); //creates router to which you can register routes to

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce') //Ctrl = short for controller

router.post('/', auth, sauceCtrl.createSauce);
router.get( '/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce); //UPDATE an existing sauce - CRUD
router.delete('/:id', auth, sauceCtrl.deleteSauce); //DELETE a sauce - CRUD

module.exports = router; //makes router available outside of this file

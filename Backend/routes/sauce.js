const express = require('express');
const router = express.Router(); //creates router to which you can register routes to

const sauceCtrl = require('../controllers/sauce') //Ctrl = short for controller

router.post('/', sauceCtrl.createSauce);
router.get( '/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.modifySauce); //UPDATE an existing sauce - CRUD
router.delete('/:id', sauceCtrl.deleteSauce); //DELETE a sauce - CRUD

module.exports = router; //makes router available outside of this file
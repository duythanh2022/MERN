const router = require('express').Router();
const { models } = require('mongoose');
const authCtrl = require('../controllers/authController')
router.post('/register',authCtrl.authRegister)
router.post('/login',authCtrl.authLogin)
module.exports = router;

const router = require('express').Router();
const userCtrl = require('../controllers/userController')

router.get("/user/:id",userCtrl.getUserById)

module.exports = router;
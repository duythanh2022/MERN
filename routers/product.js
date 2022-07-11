const router = require('express').Router();
const productCtrl = require('../controllers/productController')
const verifyAuth = require('../middleware/auth')

router.post('/product',verifyAuth,productCtrl.createNewProduct)

module.exports = router;
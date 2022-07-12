const router = require('express').Router();
const productCtrl = require('../controllers/productController')
const { verifyAuth,verifyTokenAndAuthor } = require('../middleware/auth')
router.post('/product',verifyAuth,productCtrl.createNewProduct)
router.put('/product/:id',verifyAuth,productCtrl.editProduct)
router.get("/",productCtrl.getAllProduct)
router.get("/product/:id",verifyTokenAndAuthor,productCtrl.getProductDetail)
router.delete("/product/:id",verifyAuth,productCtrl.deleteProduct)
module.exports = router;
const Product = require('../models/Product')


const productCtrl = {
    createNewProduct: async (req,res) =>{
        const { name,brand,price,description,img } = req.body
        if(!name) return res.status(400).json({success: false, message: 'Product already exists'})

        try {
            const newProduct =  new Product({
                name,
                // description,
                brand,
                price,
                user:req.userId
                // img
            })
            await newProduct.save()
            res.status(200).json({success: true, message:"post success ",product:newProduct})
        } catch (error) {
            
        }
    }
}
module.exports = productCtrl
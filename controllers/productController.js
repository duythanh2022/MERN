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
            console.log(error)
            res.status(500).json({success:false, message:"Internal server Error"})
        }
    },
    editProduct: async (req,res) =>{
        try {
            const {id} = req.param 
            const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
            await product.save()
            res.status(200).json({success:true,message:"success update product"})
            console.log("data",data)
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false, message:"update faild"})
        }
    
    }
}
module.exports = productCtrl
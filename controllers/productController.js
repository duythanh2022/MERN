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
            const { id } = req.params 
            const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
            res.status(200).json({success:true,message:"success update product",product})
            console.log("data",product)
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false, message:"update field error"})
        }
    
    },
    getAllProduct: async (req, res) => {
        // const qnew = req.query.new
        // const category = req.query.categories
        
        // try {
        //     if(qnew){
        //         const products = await Product.find().sort({createAt:-1}).limit(1)
        //     }else if(category){
        //         const category =  await Product.find({
        //             categories : {
        //                 $in : [category]
        //             }
        //         })
        //     }else{
        //         products = await Product.find()
        //     }
        // } catch (error) {
        //     console.log(error)
        //      res.status(500).json({success:false, message:"Internal server Error"})
        // }
        try {
            const product = await Product.find()
            res.status(200).json({success:true,message:"success get all product",product})
            console.log("product",product)
        }catch (error){
            console.log(error)
            res.status(500).json({success:false, message:"Internal server Error"})
        }
    },
    getProductDetail: async (req, res)=>{
        try {
            const {id} = req.params
            const product = await Product.findById({id,user: req.userId})
            console.log("product",product)
            res.status(200).json({success:true, message:"success get product detail",product})
        } catch (error) {
            console.log(error)
            res.status(500).json({success:false, message:"Internal server Error"})
        }
    },
    deleteProduct: async (req, res)=>{
        try {
            const {id} = req.params
            const deleteProduct = await Product.findByIdAndDelete({id,user: req.userId})
            console.log("deleteProduct",deleteProduct)
            res.status(200).json({success:true,message:"delete success",deleteProduct})
        }catch(error){
            console.log(error)
            res.status(500).json({success:false, message:"Internal server"})
        }
    }

}
module.exports = productCtrl
const Cart = require('../models/Cart')

const cartCtrl = {
    newCart: async (req, res) => {
        const newCart = new Cart.create(req.body)
        try {
          const saveCart = await newCart.save()
            res.status(200).send({success:true, message: 'Cart saved successfully',saveCart})
        } catch (error) {
            console.log(error)
            res.status(500).send({success:false, message: error.message})
        }
    },
    editCart: async (req, res) => {
       try {
        const {id} = req.params
        const editCart = await Cart.findByIdAndUpdate(id)
        console.log(editCart,"a")
        res.status(200).send({success:true, message:"EditCart saved successfully",editCart})
       } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message:"internal server errors"})
       }
    }
}


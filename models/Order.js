const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    productCart:[
        {
            productId:{
                type: String,
            },
            quantity:{
                type: Number,
                default: 1,
            }

        }
    ],
    amount:{type: String, required: true},
    address:{type:Object, required: true},
    status:{type:String, default:"pending"},

})
module.exports = mongoose.model('Cart', orderSchema);
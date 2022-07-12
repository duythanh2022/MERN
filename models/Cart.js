const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
    amount:{type: Number, default: 1, required: true}

})
module.exports = mongoose.model('Cart', cartSchema);
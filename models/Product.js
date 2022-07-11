const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      brand:{
        type:String,
        required:true
      },
      price:{
        type:Number,
        require:true,
        default:0
      },
      img:{
        type:String,
        data:Buffer,
      },
      description:{
        type:String,
        require:true
      },
})
module.exports = mongoose.model('Product', productSchema);
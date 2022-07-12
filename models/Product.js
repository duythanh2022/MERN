const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      desc:{
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
      categories:{
        type:Array,
      },
      size:{
        type:String,
      },
      color:{
        type:String,
      },
    
},  {timestamps:true})
module.exports = mongoose.model('Product', productSchema);
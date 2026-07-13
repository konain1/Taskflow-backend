
    const mongoose = require('mongoose')

    const productSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:String,
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        members:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    },{

        timestamps:true
    }
)

const Product = mongoose.model('Product',productSchema)

module.exports = Product
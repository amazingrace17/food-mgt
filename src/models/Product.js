import mongoose from 'mongoose'

const {Schema, model} = mongoose

const productSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    },
    
    category:{
        type: Schema.Types.ObjectId,
        ref:'category',
    //     required:true,
        
    },
    tags:{
        type:String,
    },
    imageUrl:{
        type:String,
        // required:true,
    },
    Slashedprice:{
        type:Number,
        required:true,
    },
    Price:{
        type:Number,
    },
    // creator:{
    //     type: Schema.Types.ObjectId,
    //     ref:'Seller',
    //     required:true,
    // },
    
},
{
    timestamps:true
},
)
export const Product = model('product', productSchema)
import mongoose from 'mongoose'

const {Schema, model} = mongoose

const itemSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    },
    tags:{
        type:String,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    Slashedprice:{
        type:Number,
        required:true,
    },
    Price:{
        type:Number,
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:'Seller',
        required:true,
    },
    
},
{
    timestamps:true
},
)
export const Item = model('item', itemSchema)
import mongoose from "mongoose";

import validator from 'validator'

const { Schema, model} = mongoose;
const {isEmail} = 'validator'

const addressInfo = {
    street:String,
    locality:String,
    aptName:String,
    phoneNo: Number,
    lat: Number,
    lng:Number,
    zip:String,
};

const sellerSchema = new Schema(
    {
        name : {
            type: String,
            required:true,
        },
        tags:{
            type:String,
            required:true,
        },
        formattedAddress:{
            type:String,
            required:true,
        },
        email : {
            type: String,
            required:[true,'Please enter an email'],
            unique:true,
            lowercase:true,
            validate : [isEmail, 'Please enter a valid email'],
        },
        address : addressInfo,
        password: {
            type: String,
            required:[true,'Please enter a password']
        },
        account: {
            type: Schema.Types.ObjectId, 
            required: true,
            ref : 'Account'
        },
        imageUrl:[{
            type:String,
            required:true,
        }],
        
            items: [{
                type:Schema.Types.ObjectId,
                ref : 'Item',
                
            },
            ],
        

    },
    {timestamps: true}
);

export const Seller = model('user', sellerSchema)
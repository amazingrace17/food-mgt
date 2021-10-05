import mongoose from "mongoose";
 
import validator from 'validator'

const { Schema, model} = mongoose;
const {isEmail} = 'validator'

const deliveryInfo = {
    street:String,
    locality:String,
    aptName:String,
    phoneNo: Number,
    lat: Number,
    lng:Number,
};

const userSchema = new Schema(
    {
        name : {
            type: String,
            required:true,
        },
        email : {
            type: String,
            required:[true,'Please enter an email'],
            unique:true,
            lowercase:true,
            validate : [isEmail, 'Please enter a valid email'],
        },
        address : deliveryInfo,
       
        account: {
            type: Schema.Types.ObjectId, 
            required: true,
            ref : 'Account'
        },
        cart:{
            items: [
                {
                    _id:false,
                    itemsId : {
                        type:Schema.Types.ObjectId,
                        ref : 'Item',
                        required:true,
                    },
                    quantity:{type:Number, required : true},
                },
            ],
        },

    },
    {timestamps: true}
);

export const User = model('user', userSchema)
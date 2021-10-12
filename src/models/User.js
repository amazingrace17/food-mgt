import mongoose from "mongoose";

const { Schema, model } = mongoose;

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
    firstName : {
      type: String,
      required:true,
    },
    lastName : {
      type: String,
      required:true,
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
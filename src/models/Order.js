
import mongoose from 'mongoose'

const {Schema, model} = mongoose;

const orderSchema = new Schema({
  items:[{
        item:{type:Object, required:true},
        quantity:{type:Number, required:true},
  }],
  status:{
      type:String,
      required:true,
      enum :[
          'Placed',
          'Cancelled',
          'Accepted',
          'Completed',
          'Out for delivery',
      ],

  },
  user: {
      email:{
          type:String,
          required:true,
      },
      address:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:address
      },
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    seller: {
      phone: {
        type: Number,
        required: true,
      },
      
      

  }
},{ timestamps: true }
)

export const Order = model('order', orderSchema)
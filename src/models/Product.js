import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
      required: true,
    },
    subcategory: {
      type: SchemaTypes.ObjectId,
      ref: 'subcategory',
      required: true,
    },
    tags:{
        type:String,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount:{
        type:Number,
        required:true,
    },
    stock: {
      type: Number,
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export const Product = model('product', productSchema);
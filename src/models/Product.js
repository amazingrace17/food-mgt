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
    productImage: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    inventoryCount: {
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

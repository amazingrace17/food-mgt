import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
        type: String
    }
  },
);

export const Category = model('category', categorySchema);
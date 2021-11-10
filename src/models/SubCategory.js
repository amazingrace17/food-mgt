import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
        type: String
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: 'category',
      required: true,
    }
  },
);

export const SubCategory = model('subcategory', subCategorySchema);
import mongoose from 'mongoose'

const { Schema, model, SchemaTypes } = mongoose

const addressSchema = new Schema({
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    street:String,
    locality:String,
    aptName:String,
    phoneNo: Number,
    lat: Number,
    lng: Number,
    
})

export const address = model ('Address', addressSchema)
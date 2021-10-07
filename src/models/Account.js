import mongoose from 'mongoose'
import validator from 'validator'

const {isEmail} = validator

const { Schema, model} = mongoose,

const accountSchema = new Schema(
    {
        email : {
            type: String,
            required:[true,'Please enter an email'],
            unique:true,
            lowercase:true,
            validate : [isEmail, 'Please enter a valid email'],
        },
        password: {
          type: String,
          required:[true,'Please enter a password']
      },
      role: {
        type: String,
        enum: ["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"],
        required: true,
      },
      accountVerifyToken: String,
      accountVerifyTokenExpiration: Date,
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export const Account = model ( 'account', accountSchema)
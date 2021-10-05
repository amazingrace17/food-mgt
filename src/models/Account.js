import mongoose from 'mongoose'

const { Schema, model} = mongoose,

const accountSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
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
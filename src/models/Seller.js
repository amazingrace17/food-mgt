// import mongoose from "mongoose";

// const { Schema, model} = mongoose;

// const addressInfo = {
//     street:String,
//     locality:String,
//     aptName:String,
//     phoneNo: Number,
//     lat: Number,
//     lng:Number,
//     zip:String,
// };

// const sellerSchema = new Schema(
//     {
//         name : {
//             type: String,
//             required:true,
//         },
//         tags:{
//             type:String,
//             required:true,
//         },
//         formattedAddress:{
//             type:String,
            
//         },
//         address : addressInfo,
//         minOrderAmount:Number,
//         costForOne:Number,
//         payment:[{
//             type:String,
//             required:true,
//         } ,
//         ],
        
//         account: {
//             type: Schema.Types.ObjectId, 
//             required: true,
//             ref : 'Account'
//         },
//         imageUrl:[{
//             type:String,
//             required:true,
//         }],
        
//             items: [{
//                 type:Schema.Types.ObjectId,
//                 ref : 'Item',
                
//             },
//             ],
        

//     },
//     {timestamps: true}
// );

// export const Seller = model('seller', sellerSchema)
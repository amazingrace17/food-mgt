// const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// var mongoose = require("mongoose");

// const Seller = require("../models/seller");
// const Item = require("../models/Product");
// const User = require("../models/user");
// const Account = require("../models/account");
// const Order = require("../models/order");


// const SellerController = {
//   signupSeller : async (req, res, next) => {
//     const errors = validationResult(req);
  
//     if (!errors.isEmpty()) {
//       const error = new Error("Validation Failed, Incorrect data entered.");
//       error.statusCode = 422;
//       error.errors = errors.array();
//       throw error;
//     }
  
//     if (req.files.length == 0) {
//       const error = new Error("Upload an image as well.");
//       error.statusCode = 422;
//       throw error;
//     }
  
//     const arrayFiles = req.files.map((file) => file.path);
//     const email = req.body.email;
//     const name = req.body.name;
//     const password = req.body.password;
//     const tags = req.body.tags;
//     const role = req.body.role;
//     const payment = req.body.payment;
//     const paymentArray = payment.split(" ");
    
//     const phoneNo = req.body.phoneNo;
//     const street = req.body.street;
    
//     const formattedAddress = req.body.formattedAddress;
//     const lat = req.body.lat;
//     const lng = req.body.lng;
//     const locality = req.body.locality;
//     const zip = req.body.zip;
  
//     let token;
  
//     if (role !== "seller") {
//       const error = new Error(
//         "Signing up a seller should have a role of ROLE_SELLER"
//       );
//       error.statusCode = 500;
//       throw error;
//     }
  
//     bcrypt
//       .hash(password, 12)
//       await((hashedPassword) => {
//         token = crypto.randomBytes(32).toString("hex");
  
//         const account = new Account({
//           role: role,
//           email: email,
//           password: hashedPassword,
//           accountVerifyToken: token,
//           accountVerifyTokenExpiration: Date.now() + 3600000,
//         });
//         return account.save();
//       })
//       await((savedAccount) => {
//         const seller = new Seller({
//           name: name,
//           tags: tags,
//           imageUrl: arrayFiles,
//           minOrderAmount: minOrderAmount,
//           costForOne: costForOne,
//           account: savedAccount,
//           payment: paymentArray,
//           formattedAddress: formattedAddress,
//           address: {
//             street: street,
//             zip: zip,
//             phoneNo: phoneNo,
//             locality: locality,
//             aptName: aptName,
//             lat: lat,
//             lng: lng,
//           },
//         });
//         return seller.save();
//       })
//       await((savedSeller) => {
//         transporter.sendMail({
//           to: email,
//           from: "YOUR_SENDGRID_VERIFIED_EMAIL",
//           subject: "Verify your Account on Food Bargain",
//           html: `
//                         <p>Please verify your email by clicking on the link below - Food Bargain</p>
//                          <p>Click this <a href="http://localhost:3002/auth/verify/${token}">link</a> to verify your account.</p>
//                       `,
//         });
//         res.status(201).json({
//           message:
//             "Seller signed-up successfully, please verify your email before logging in.",
//           sellerId: savedSeller._id,
//         });
//       })
//       .catch((err) => {
//         if (!err.statusCode) err.statusCode = 500;
//         next(err);
//       });
//   },
//   imagesTest : async (req, res, next) => {
//     if (!req.files) {
//       const error = new Error("Upload an image as well.");
//       error.statusCode = 422;
//       throw error;
//     }
  
//     const arrayFiles = req.files.map((file) => file.path);
//     console.log(arrayFiles);
  
//     res.status(200).json({ message: "success" });
//   }
// }
// export default SellerController

  
  
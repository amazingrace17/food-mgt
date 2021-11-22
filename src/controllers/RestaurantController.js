

// import { User } from '../models/User.js';
// import { Seller } from '../models/seller.js';

// const restaurantController = {
//    getRestaurants: async (req, res, next) => {
//     Seller.find()
//       .populate("account", "isVerified")
//       .sort({ createdAt: -1 })
//       .then((sellers) => {
//         const sellersFinal = sellers.filter((restaurant) => {
//           return restaurant.account.isVerified === true;
//         });
//         res.status(200).json({
//           restaurants: sellersFinal,
//           totalItems: sellersFinal.length,
//         });
//       })
//       .catch((err) => {
//         if (!err.statusCode) err.statusCode = 500;
//         next(err);
//       });
//   }, 
// }
// export default restaurantController
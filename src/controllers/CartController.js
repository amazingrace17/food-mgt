

import { User } from '../models/User.js'
import { Account } from '../models/Account.js'
import { Seller } from '../models/Seller.js'
import { validationResult } from 'express-validator';


const cartController = {
postCart : async (req, res, next) => {
    const itemId = req.body.itemId;
    let targetItem;
    if (!itemId) {
      const error = new Error("ItemId not provided");
      error.statusCode = 404;
      throw error;
    }
    Item.findById(itemId)
      .then((item) => {
        targetItem = item;
        return User.findById(req.savedUser);
      })
      .then((user) => {
        return User.findOne({ user: user._id });
      })
      .then((user) => {
        return user.addToCart(targetItem);
      })
      .then((result) => {
        res.status(200).json({ message: "Item successfully added to cart." });
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  },
  getCart: async (req, res, next) => {
    User.findById(req.savedUser)
    try{
         let user = await User.findOne({user:user._id})
         let user = await User.populate('cart.items.itemId').execPopulate();
        let cartItems = await user.cart.items;
        
    }catch(err){
        error
    }

   

      
      
      .then((user) => {
        const cartItems = user.cart.items;
        let totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice = totalPrice + item.quantity * item.itemId.price;
        });
        res.json({ cart: cartItems, totalPrice: totalPrice });
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  },
  postCartDelete : async  (req, res, next) => {
    const itemId = req.body.itemId;
    if (!itemId) {
      const error = new Error("ItemId not provided");
      error.statusCode = 404;
      throw error;
    }
    Account.findById(req.savedUser)
      .then((user) => {
        return User.findOne({User: user._id });
      })
      .then((user) => {
        return user.removeFromCart(itemId);
      })
      .then((result) => {
        res.status(200).json({ message: "Item successfully removed from cart." });
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  },
  postCartRemove : async (req, res, next) => {
    const itemId = req.params.itemId;
    if (!itemId) {
      const error = new Error("ItemId not provided");
      error.statusCode = 404;
      throw error;
    }
    Account.findById(req.loggedInUserId)
      .then((account) => {
        return User.findOne({ account: account._id });
      })
      .then((user) => {
        return user.reduceQuantity(itemId);
      })
      .then((result) => {
        res.status(200).json({ message: "Item successfully updated." });
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  },
}
export default cartController

  
  
  
 
  


import { Cart } from '../models/Cart.js';

const CartController = {
  createCart: async (req, res) => {
    let { userId, items } = req.body;

    if (!userId || !items || items.length < 1) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please add some items to the cart' });
    }

    const billArray = items.map((i) => (i.quantity * i.price));
    const bill = billArray.reduce((prevTotal, nextPrice) => prevTotal + nextPrice, 0);

    try {
      const cartExists = await Cart.findOne({ userId });
      let cart;
      if (cartExists) {

        req.body.items = items;
        req.body.bill = bill;
        cart = await Cart.findOneAndUpdate(
          userId,
          req.body,
          { new: true }
        );
        console.log('Updated Cart')
      } else {
        // const newCart = new Cart(req.body);
        const newCart = new Cart();
        newCart.userId = userId;
        newCart.items = items;
        newCart.bill = bill;

        cart = await newCart.save();
        console.log('New Cart')
      }
      
      console.log('...');
      console.log(cart);
      if (!cart) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'cart not populated' });
      }
      return res.status(200)
        .json({ status: 'success', message: 'cart saved successfully', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCart: async (req, res) => {
    const { userId } = req.body;
    try {
      const cart = await Cart.findOne({ userId: userId }) 
        // .populate('user', 'name', 'email')    
        .exec()
        ;
      return res.status(200)
        .json({ status: 'success', message: 'cart retrieved', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  deleteCart: async (req, res) => {
    const { userId } = req.body;

    try {
      const cart = await Cart.findOne({ userId });
      cart.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'cart deleted successfully.', 
        });
    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  }
}

export default CartController;
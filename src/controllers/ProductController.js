import { Product } from '../model/Product.js';
import pagination from '../services/pagination.js';

const ProductController = {
  createProduct: async (req, res) => {
    const { name, description, category, subcategory, productImage, price, inventoryCount } =
      req.body;
    
    // const { name, description, category, subcategory, productImage, price, inventoryCount } = req.body;
    const reqFields = ['name', 'description', 'category', 'subcategory', 'price', 'inventoryCount'];

    for (const field of reqFields) {
      if (!req.body[field] ) {
        return res.status(400).json({ 
          status: 'failed', 
          message: `${field} field is required` 
        });
      }
    }

    try {
      //TODO send image to cloudinary ==> image url
      //res.body.image = url
      const newProduct = new Product(req.body);
      const product = await newProduct.save();
      if (!product) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getProduct: async (req, res) => {

    try {
      const product = await Product.find({}).populate('category', 'name').exec();
      const pgn = await pagination(req, 1, Product);
      
      return res.status(201).json({
        status: 'success',
        message: 'successful',
        data: product,

        // pagination
        documentCount: pgn.documentCount,
        totalPages: pgn.totalPages,
        nextPage: pgn.nextPage,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findOne({_id: productId})
        .populate('category', 'name')
        .exec();
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: product });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
    
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;
    // const { name, description, category, subcategory, productImage, price, inventoryCount } = req.body;
    const reqFields = ['name', 'description', 'category', 'subcategory', 'price', 'inventoryCount'];

    for (const field of reqFields) {
      if (!req.body[field] ) {
        return res.status(400).json({ 
          status: 'failed', 
          message: `${field} field is required` 
        });
      }
    }

    try { 
      const product = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      ); 

      if (!product) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'product not updated' });
      }

      return res.status(200)
        .json({ status: 'success', message: 'successfully updated', data: product });
   
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  deleteProduct: async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);
      product.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'successfully deleted', 
          data: product 
        });
          

    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  }
};

export default ProductController;

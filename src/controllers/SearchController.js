import { Product } from '../models/Product.js';
import pagination from '../services/pagination.js';

const SearchController = {
  products: async (req, res) => {
    const filters = req.query;
    // for (const key in filters) { { key: filters[key] } }

    try {
      // https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/
      const filteredProducts = await Product.find({ 
        $or: [
          // { name: { $regex: filters.name, $options: 'i' } },
          { name: filters.name }, 
          { category: filters.category }, 
          { subcategory: filters.subcategory }, 
        ] 
      });
      // const pgn = await pagination(req, 1, Product);

      if (!filteredProducts) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'products not found' });
      }

      return res
        .status(200)
        .json({
          status: 'success', 
          message: 'search successful', 
          data: filteredProducts,
            // // pagination
            // documentCount: pgn.documentCount,
            // totalPages: pgn.totalPages,
            // nextPage: pgn.nextPage,
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },
  
  productsByName: async (req, res) => {
    const filters = req.query;

    try {
      const filteredProducts = await Product.find({ name: { $regex: filters.name, $options: 'i' } });

      if (!filteredProducts) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'products not found' });
      }

      return res
        .status(200)
        .json({
          status: 'success', 
          message: 'search successful', 
          data: filteredProducts
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  }

}
export default SearchController;

import { SubCategory } from '../models/SubCategory.js';

const SubCategoryController = {
  createSubCategory: async (req, res) => {
    const { name, description, category } = req.body;

    try {
      if (!name || !description || !category) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Please fill all fields' });
      }

      const newSubCategory = new SubCategory(req.body);

      const subcategory = await newSubCategory.save();
      if (!subcategory) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'Subcategory added successfully', data: subcategory });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getSubCategories: async (req, res) => {
    try {
      const categories = await SubCategory.find({}).lean().exec();
      return res
        .status(200)
        .json({ status: 'success', message: 'Subcategories retrieved', data: categories });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getSubCategoryById: async (req, res) => {
    const subcategoryId = req.params.id;

    try {
    const category = await SubCategory.findById(subcategoryId);
    if (category) {
    return res
        .status(200)
        .json({ status: 'success', message: 'successful', data: category });
    }
    return res
        .status(404)
        .json({ status: 'fail', message: 'subcategory not found' });
    
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  updateSubCategory: async (req, res) => {
    const subcategoryId = req.params.id;
    const { name, description } = req.body;

    // Check if there's at least one information to update
    if(![ name, description ].some(Boolean)) {
      return res.status(400).json({
        status: "Failed", message: "All fields cannot be blank to update subcategory"
      })
    }

    try {
      const subcategory = await SubCategory.findByIdAndUpdate(
        subcategoryId,
        req.body,
        { new: true }
      );
      
      // If server error occurs OR no matching id was found
      if(!subcategory) {
        return res.status(404).json({ 
          status: "Failed", message: "Error updating subcategory"
        });
      }
      
      return res.status(200).json({ 
        status: "Success", 
        message: "Subcategory updated successfully", 
        data: subcategory
      });

    } catch (error) {
      return res.status(500).json({
        status: 'Fail',
        message: error.message
      });
    }
  },

  deleteSubCategory: async(req,res)=>{
    const subcategoryId = req.params.id;
      
    try {
      const deletedSubCategory = await SubCategory.findByIdAndRemove(subcategoryId);

      if (deletedSubCategory) {
        return res
          .status(200)
          .json({
            status: "success", message: "Subcategory deleted"
        });
      }

      return res
          .status(404)
          .json({ status: 'fail', message: 'subcategory not found' });
        
    } catch (error) {
        res.status(400).send(error.reason={msg: "id not found"});
    }
  }
}

export default SubCategoryController;
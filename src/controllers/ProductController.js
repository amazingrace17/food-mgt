
import {Category} from '../models/Category.js'
import {Product} from '../models/Product.js'
// import { Seller } from '../models/Seller.js'; 


const ProductController = {
//     createCategory: async (req,res) =>{
//         const {name, description, access} = req.body;
//         if(!role ||access!=='admin'|| access!=='seller'){
//             return res.status(401).json({status:fail, message : Unauthorized});
//         }
//         if(!name || description){
//             return res
//             .status(400)
//             .json ({status:'fail', messae : 'Please fill all fields'})
//         }
//         try{
//             const newCategory = new Category(req.body);
//             const category = await newCategory.save();
//             if(!category){
//                 return res
//                 .status(400)
//                 .json({status:'fail', message: 'something went wrong'})
//             }
//             return res.status(201).json({status:'sucess', message:'successful', data : category});
//         }
//         catch (err) {
//             return res
//             .status(500)
//             .json({status:'fail', message: 'server err', err});
        
//     }
// },

// getCategory: async (req, res) => {
//     try {
//       const categories = await Category.find({}).lean().exec();
//       return res
//         .status(201)
//         .json({ status: 'success', message: 'successful', data: categories });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ status: 'fail', message: 'server err', err });
//     }
//   },

//     editCategory: async(req, res) =>{
//         const {id: _id} = req.params

//         if (![req.body.name, req.body.description].some(Boolean)){
//            return res
//             .status(400)
//             .json({status: 'fail', message: 'Please fill fields to update category'})
//         }
//         try{
//             const updatedCategory = await Category.findByIdAndUpdate(
//                 {_id},
//                 req.body,
//                 {new:true}
//             );
//             if(!updatedCategory.length|| !updatedCategory)
//             return res.status(404).json({
//                 status:'Fail', message: 'There was an error'
//             });
//             return res.status(200). json({
//                 status:'Success',
//                 message: 'Category updated Sucessfully',
//                 data:updatedCategory
//             });

//         }
//         catch (error){
//             return res.status(500).json({
//                 status:'Fail',
//                 message: error.message
//             });
//         }
//     },

    createProduct: async(req, res) =>{
        const {name, description, category, productImage, price, access} = req.body;

        if(!access){
            return res
            .status(400)
            .json({ status:'fail', message : 'Users can not upload products'})

        }

        if(!name || !description|| !price ||!category){
            return res
            .status(400)
            .json({status:'fail', message:'Please fill all fields'})
        }

        try{
         const newProduct = new Product(req.body);
         const product = await newProduct.save();
         if(!product) {
             return res
             .status(400)
             .json({
                 status: 'Fail',
                 message:'something went wrong'
             })
         }
         return res
         .status(201)
         .json({
             status: 'success', message:'successful',
             data: product
         })

        }
        catch(err){
            return res.status(500).json({status:'failed', message: 'SERVER ERR' , err})

        }
    },

    getProduct: async(req,res) =>{
        const Page_size = 20;
        let page = 1;
        let skip;

    if(req.query.page){
        page = Number(req.query.page);
        skip - (page - 1) * Page_size;
    }
    try{
        const product = await Product.find({}).populate().lean().exec();
        const docCount = await Product.find({}).countDocuments();
        return res.status(201).json({
            status: 'Sucess',
            message:'successful',
            data: product,
            documentCount:docCount,
            totalPages: Math.ceil(docCount/ Page_size),
            nextPage: Math.ceil(docCount/ Page_size) > page? `/${page +1}` : null,

        })
    }
    catch (err){
        return res
        .status(500)
        .json({status:fail, message : 'server err', err});
    }
    },
    getProductById : async(req,res) =>{
        const {productId} = req.params;
        try{
            const product = await Product.findOne({
                _id: productId
            }).lean().exec();
            return res
            .status(201)
            .json({status:'success', message:'successful', data: product})
            
        }
        catch(err){
            return res
            .status(500)
            .json({
                status:'fail',
                err
            })

        }
    },

    createOrder : async(req,res) =>{
        const {userId, product, bill} = req.body;
        if(!userId || !product || !bill){
            return res 
            .status(400)
            .json({status: 'fail', message : 'something went wrong'});


        }
        return res
        .status(201)
        .json({
            status:'success' , message: 'successful', data: order
        })
    },

    getOrder : async(req,res) =>{
        const Page_size = 20;
        let page = 1;
        let skip;
        if (req.query.page){
            page = Number(req.query.page);
            skip= (page -1 ) * Page_size;
        }
        try{
            const order=  await Order. find({}).populate().lean().exec();
            const docCount = await Order.find({}).countDocuments();
            return res.status(201).json({
                status: ' success',
                message : 'successful',
                data : order, 
                documentCount:docCount,
                totalPages : Math.ceil(docCount/Page_size),
                nextPage: Math.ceil(docCount/Page_size) > page ? `${page + 1}` : null,
            });
        }
        catch(err){
            return res
            .status(500)
            .json({status : 'fail', message : 'server err', err})
        }
    }
}

export default ProductController;
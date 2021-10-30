import {Category} from '../models/Category'
import { Item } from '../models/Item'
import { Seller } from '../models/Seller';

const ItemController = {
    createCategory: async (req,res) =>{
        const {name, description, access} = req.body;
        if(!access||access!=='admin'|| access!=="seller"){
            return res.status(401).json({status:fail, message : Unauthorized});
        }
        if(!name || description){
            return res
            .status(400)
            .json ({status:'fail', messae : 'Please fill all fields'})
        }
        try{
            const newCategory = new Category(req.body);
            const category = await newCategory.save();
            if(!category){
                return res
                .status(400)
                .json({status:'fail', message: 'something went wrong'})
            }
            return res.status(201).json({status:'sucess', message:'successful', data : category});
        }
        catch (err) {
            return res
            .status(500)
            .json({status:'fail', message: 'server err', err});
        
    }
},

    editCategory: async(req, res) =>{
        const {id: _id} = req.params

        if (![req.body.name, req.body.description].some(Boolean)){
           return res
            .status(400)
            .json({status: 'fail', message: 'Please fill fields to update category'})
        }
        try{
            const updatedCategory = await Category.findByIdAndUpdate(
                {_id},
                req.body,
                {new:true}
            );
            if(!updatedCategory.length|| !updatedCategory)
            return res.status(404).json({
                status:'Fail', message: 'There was an error'
            });
            return res.status(200). json({
                status:'Success',
                message: 'Category updated Sucessfully',
                data:updatedCategory
            });

        }
        catch (error){
            return res.status(500).json({
                status:'Fail',
                message: error.message
            });
        }
    },

    createItem: async(req, res) =>{
        const {name, description, category, itemImage, price, access} = req.body;

        if(!access ||access!==admin || access!== vendor){
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
         const newItem = new Item(req.body);
         const item = await newItem.save();
         if(!item) {
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
             data: item
         })

        }
        catch(err){
            return res.status(500).json({status:'failed', message: 'SERVER ERR' , err})

        }
    },

    getItem: async(req,res) =>{
        const Page_size = 20;
        let page = 1;
        let skip;

    if(req.query.page){
        page = Number(req.query.page);
        skip - (page - 1) * Page_size;
    }
    try{
        const item = await Item.find({}).populate().lean().exec();
        const docCount = await Item.find({}).countDocuments();
        return res.status(201).json({
            status: 'Sucess',
            message:'successful',
            data: item,
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
    getItemById : async(req,res) =>{
        const {itemId} = req.params;
        try{
            const item = await Item.findOne({
                _id: itemId
            }).lean().exec();
            return res
            .status(201)
            .json({status:'success', message:'succesful', data:item})
        }
        catch(err){
            return res
            .status(500)
            .json({
                status:'fail',
                err
            })

        }
    }
}
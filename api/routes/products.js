const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Product = require('../models/products')

router.get('/',(req,res,next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count:docs.length,
            products:docs.map(doc => {
                return {
                    name:doc.name,
                    price:doc.price,
                    _id:doc._id,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        }
        // if (docs.length >= 0){
        res.status(200).json(response)
        // }else{
        //     res.status(404).json){
        //         message: 'No entries found'
        //     }
        // }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(), // new ObjectId()로 변경
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result); // req -> res로 수정
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get('/submit', (req, res, next) => {
    res.status(200).json({
        message: "dasdad"
    })
})

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        console.log(doc)
        if (doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:'GET',
                    url:'http://localhost/products'
                }
            })
        }else{
            res.status(404).json({message:'No valid entryu found for provided ID'})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })
    
   
})
router.patch("/:productId",(req,res,next) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id : id },{$set:updateOps})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({ 
            message:'Product updated',
            request:{
                type: 'PATCH',
                url: 'http://localhost:3000/products/' + id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }) 
})
router.delete("/:productId",(req,res,next) => {
    const id = req.params.productId
    Product.deleteOne({ _id : id})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({ 
            message:'Product deleted',
            request:{
                type: 'DELETE',
                url: 'http://localhost:3000/products/',
                body:{name:'String',price:'Number'}
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }) 
})

module.exports = router
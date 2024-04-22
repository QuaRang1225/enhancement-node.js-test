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
            products:docs
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

router.post('/',(req,res,next) => {
  
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })


    product
    .save()
    .then(result =>{
        console.log(result)
        res.status(201).json({
            message:'Handling POST requests tp /products',
            createdProduct:result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        if (doc){
            res.status(200).json(doc)
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
        res.status(200).json(result)
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
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }) 
})

module.exports = router
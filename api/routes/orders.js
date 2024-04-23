const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Order = require('../models/order')
const Product = require('../models/products')
  
router.get('/',(req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            order:docs.map(doc=>{
                return{
                    _id:doc._id,
                    prodcut : doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/order/' + doc._id
                    }
                }
            }),
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.post('/',(req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product => {
        if (!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product: req.body.productId
        })
        return order.save()
    })
    .then(result=> {
        console.log(result)
        res.status(201).json({
            message : 'Order stored',
            createdOrder:{
                _id:result._id,
                prodcut : result.product,
                quantity:result.quantity
            },
            request:{
                type:'POST',
                url: 'http://localhost:3000/order/' + result._id
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
  
})

router.get('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : 'Orders were details',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message : 'Orders deleted',
        orderId: req.params.orderId
    })
})
module.exports = router
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Order = require('../models/order')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'Orders were fetched'
    })
})

router.post('/',(req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity:req.body.quantity,
        product: req.body.productId
    })
    order
        .save()
        .then(result=> {
            console.log(result)
            res.status(201).json(result)
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
const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'Handling GET requests tp /products'
    })
})

router.post('/',(req,res,next) => {
    const product = {
        name:req.body.name,
        price:req.body.price
    }
    res.status(201).json({
        message:'Handling POST requests tp /products',
        createdProduct:product
    })
})

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId
    if (id == 'special'){
        res.status(200).json({
            message:'You discoveres the special ID',
            id:id
        })
    }else{
        res.status(200).json({
            message:'You passed an ID'
        })
    }
   
})
module.exports = router
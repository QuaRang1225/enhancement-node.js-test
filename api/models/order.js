const mongoose = require('mongoose')

const prodcutSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product:{type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    quantity:{type:Number,default:1}
})

module.exports = mongoose.model('Order',prodcutSchema)
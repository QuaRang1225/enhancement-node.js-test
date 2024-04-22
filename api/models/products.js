const mongoose = require('mongoose')

const prodcutSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String,
    price:Number
})

module.exports = mongoose.model('Product',prodcutSchema)
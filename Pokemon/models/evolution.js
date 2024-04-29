const mongoose = require('mongoose')

const evolutionSchema = mongoose.Schema({
    _id : Number,
    evol_to : [],
    images : String,
    name : String
})

module.exports = mongoose.model('Evolution',evolutionSchema)
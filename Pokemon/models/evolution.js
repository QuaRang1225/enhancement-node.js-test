const mongoose = require('mongoose')

const evolutionSchema = mongoose.Schema({
    _id : Number,
    evol_to : [],
    image : [],
    name : String
})

module.exports = mongoose.model('Evolution',evolutionSchema)
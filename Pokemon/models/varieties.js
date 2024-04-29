const mongoose = require('mongoose')

const varietiesSchema = mongoose.Schema({
    name : String,
    abilites : {
        is_hidden : [],
        name : [],
        text : []
    },
    form : {
        images : String,
        name : String
    },
    height : Number,
    stats : [],
    types : [],
    weight : Number
})

module.exports = mongoose.model('Varieties',varietiesSchema)
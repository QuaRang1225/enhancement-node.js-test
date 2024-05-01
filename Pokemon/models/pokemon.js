const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    _id : Number,
    color:String,
    base : {
        types : [],
        image : String
    },
    capture_rate : Number,
    dex : [], //num, region
    egg_group : [],
    evolution_tree : Number,
    forms_switchable : Boolean,
    gender_rate : Number,
    genra : String,
    hatch_counter : Number,
    name : String,
    text_entries : {
        text : [],
        version : []
    },
    varieties : []
})

module.exports = mongoose.model('Pokemon',pokemonSchema)
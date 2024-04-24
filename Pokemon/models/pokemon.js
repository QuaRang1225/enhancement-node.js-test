const mongoose = require('mongoose')

const pokemonSchema = mongoose.Schema({
    capture_rate : Number,
    dex_num : [],
    dex_region : [],
    egg_group : [],
    evolution_tree : Number,
    forms_switchable : Boolean,
    gender_rate : Number,
    genra : String,
    hatch_counter : Number,
    name : String,
    num : Int16Array,
    text_entries_text : [] ,
    text_entries_version : [] ,
    varieites : []
})

module.exports = mongoose.model('Pokemon',pokemonSchema)
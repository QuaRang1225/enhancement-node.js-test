const mongoose = require('mongoose')

const varieitesSchema = mongoose.Schema({
    name : String,
    abilites_is_hidden : [],
    abilites_name : [],
    abilites_text : [],
    form_images : String,
    form_name : String,
    height : Number,
    stats : [],
    types : [],
    weight : Number
})

module.exports = mongoose.model('Varieites',varieitesSchema)
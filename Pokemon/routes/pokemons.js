const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Pokemon = require('../models/pokemon')
const Varieites = require('../models/vaieites')

router.get('/',(req,res,next) => {
    Pokemon.find()
    .exec()
    .then(docs => {
        const response = {
            count:docs.length,
            products:docs.map(doc => {
                return {
                    _id : doc._id,
                    capture_rate : doc.capture_rate,
                    dex_num : doc.dex_num,
                    dex_region : doc.dex_region,
                    egg_group : doc.egg_group,
                    evolution_tree : doc.evolution_tree,
                    forms_switchable : doc.forms_switchable,
                    gender_rate : doc.gender_rate,
                    genra : doc.genra,
                    hatch_counter : doc.hatch_counter,
                    name : doc.name,
                    text_entries_text : doc.text_entries_text ,
                    text_entries_version : doc.text_entries_version,
                    varieites : doc.varieites
                }
            })
        }
        res.status(200).json(response)
    })
})

router.post('/',(req,res,next) =>{
    const pokemon = new Pokemon({
        _id : req.body._id,
        capture_rate : req.body.capture_rate,
        dex_num : req.body.dex_num,
        dex_region : req.body.dex_region,
        egg_group : req.body.egg_group,
        evolution_tree : req.body.evolution_tree,
        forms_switchable : req.body.forms_switchable,
        gender_rate : req.body.gender_rate,
        genra : req.body.genra,
        hatch_counter : req.body.hatch_counter,
        name : req.body.name,
        text_entries_text : req.body.text_entries_text ,
        text_entries_version : req.body.text_entries_version,
        varieites : req.body.varieites
    })
    pokemon
    .save()
    .then(result => {
        res.status(201).json({
            status : 201,
            message : result.name + "의 데이터 저장 완료"
        })
    })
    .catch(err => {
        if (err.errorResponse.code == 11000){
            console.log(err)
            res.status(500).json({
                status : 500,
                message : "중복된 데이터 입니다"
            })
        }
    })
})

module.exports = router
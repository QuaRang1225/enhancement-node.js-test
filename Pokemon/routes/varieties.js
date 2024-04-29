const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Varieites = require('../models/varieties')

router.get('/:pokemonId',(req,res,next) => {
    const id = req.params.pokemonId
    Pokemon.findById(id)
    .exec()
    .then(doc => {
        if (doc){
            res.status(200).json({
                status : 200,
                data:{
                    _id: doc._id,
                    color:doc.color,
                    base :{
                        image : doc.base.image,
                        types : doc.base.types,
                    },
                    capture_rate: doc.capture_rate,
                    dex : doc.dex,
                    egg_group: doc.egg_group,
                    evolution_tree: doc.evolution_tree,
                    forms_switchable: doc.forms_switchable,
                    gender_rate: doc.gender_rate,
                    genra: doc.genra,
                    hatch_counter: doc.hatch_counter,
                    name: doc.name,
                    text_entries : {
                        text: doc.text_entries.text,
                        version: doc.text_entries.version,
                    },
                    varieties: doc.varieites
                },
                message : "정상적으로 포켓몬 정보를 조회했습니다."
            })
        }else{
            res.status(404).json({
                status : 404,
                message : "포켓몬 ID가 존재하지 않습니다."
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            status : 500,
            message : "포켓몬 정보 요청이 실패했습니다."
        })
    })
})

module.exports = router
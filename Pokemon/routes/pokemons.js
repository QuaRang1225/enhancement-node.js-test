const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Pokemon = require('../models/pokemon')


router.get('/:pokemonId',(req,res,next) => {
    const id = req.params.pokemonId
    Pokemon.findById(id)
    .exec()
    .then(doc => {
        if (doc){
            res.status(200).json({
                status : 200,
                data:responseValue(doc),
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



router.post('/',(req,res,next) =>{
    const pokemon = new Pokemon(requestValue(req))
    pokemon
    .save()
    .then(result => {
        res.status(201).json({
            status : 201,
            data : {},
            message : result.name + "의 데이터 저장 완료"
        })
    })
    .catch(err => {
        if (err.errorResponse.code == 11000){
            console.log(err)
            res.status(409).json({
                status : 400,
                data : {},
                message : "중복된 데이터 입니다"
            })
        }else{
            res.status(500).json({
                status : 500,
                data : {},
                message : "데이터 저장이 실패했습니다."
            })
        }
    })
})
router.patch("/:pokemonId",(req,res,next) => {
    const id = req.params.pokemonId
    const pokemon = requestValue(req)
    Pokemon.updateOne({ _id : id },pokemon)
    .exec()
    .then(result => {
        if (result.matchedCount > 0){
            res.status(200).json({
                status : 200,
                data:pokemon,
                message : "정상적으로 포켓몬 정보를 수정했습니다."
            })
        }else{
            res.status(404).json({
                status : 404,
                data : {},
                message : "포켓몬 ID가 존재하지 않습니다."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status : 500,
            data : {},
            message : "포켓몬 정보 수정이 실패했습니다."
        })
    }) 
})

router.delete("/:pokemonId",(req,res,next) => {
    const id = req.params.pokemonId
    Pokemon.deleteOne({ _id : id})
    .exec()
    .then(result => {
        if (result){
            res.status(200).json({
                status : 200,
                data:{},
                message : "정상적으로 포켓몬 정보를 삭제했습니다."
            })
        }else{
            res.status(404).json({
                status : 404,
                data : {},
                message : "포켓몬 ID가 존재하지 않습니다."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status : 500,
            data : {},
            message : "포켓몬 삭제 요청이 실패했습니다."
        })
    }) 
})

function responseValue(doc){
    return {
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
        varieties: doc.varieties
    }
}
function requestValue(req){
    return {
        _id: req.body._id,
        color : req.body.color,
        base :
        {
            types : req.body.base.types,
            image : req.body.base.image
        },
        capture_rate: req.body.capture_rate,
        dex : req.body.dex,
        egg_group: req.body.egg_group,
        evolution_tree: req.body.evolution_tree,
        forms_switchable: req.body.forms_switchable,
        gender_rate: req.body.gender_rate,
        genra: req.body.genra,
        hatch_counter: req.body.hatch_counter,
        name: req.body.name,
        text_entries : {
            text : req.body.text_entries.text,
            version : req.body.text_entries.version
        },
        varieties: req.body.varieties
    }
}

module.exports = router
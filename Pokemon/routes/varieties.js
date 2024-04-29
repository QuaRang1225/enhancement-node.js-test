const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Varieites = require('../models/varieties')

router.post('/',(req,res,next) =>{
    const pokemon = new Varieites(requestValue(req))
    pokemon
    .save()
    .then(result => {
        res.status(201).json({
            status : 201,
            data : {},
            message : result._id + "의 폼 데이터 저장 완료"
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

router.get('/:formId',(req,res,next) => {
    const id = req.params.formId
    Varieites.findById(id)
    .exec()
    .then(doc => {
        if (doc){
            res.status(200).json({
                status : 200,
                data:responseValue(doc),
                message : "정상적으로 포켓몬 폼을 조회했습니다."
            })
        }else{
            res.status(404).json({
                status : 404,
                message : "포켓몬 폼이 존재하지 않습니다."
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            status : 500,
            message : "포켓몬 폼 정보 요청이 실패했습니다."
        })
    })
})
router.patch("/:formId",(req,res,next) => {
    const id = req.params.formId
    const pokemon = requestValue(req)
    Varieites.updateOne({ _id : id },pokemon)
    .exec()
    .then(result => {
        if (result.matchedCount > 0){
            res.status(200).json({
                status : 200,
                data:pokemon,
                message : "정상적으로 포켓몬 폼 정보를 수정했습니다."
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
            message : "포켓몬 폼 정보 수정이 실패했습니다."
        })
    }) 
})

router.delete("/:formId",(req,res,next) => {
    const id = req.params.formId
    Varieites.deleteOne({ _id : id})
    .exec()
    .then(result => {
        if (result){
            res.status(200).json({
                status : 200,
                data:{},
                message : "정상적으로 포켓몬 폼 정보를 삭제했습니다."
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
            message : "포켓몬 폼 삭제 요청이 실패했습니다."
        })
    }) 
})

function responseValue(doc){
    return {
        _id : doc._id,
        abilites : {
            is_hidden : doc.abilites.is_hidden,
            name : doc.abilites.name,
            text : doc.abilites.text
        },
        form : {
            images : doc.form.images,
            name : doc.form.name
        },
        height : doc.height,
        stats : doc.stats,
        types : doc.types,
        weight : doc.weight
    }
}

function requestValue(req){
    return {
        _id : req.body._id,
        abilites : {
            is_hidden : req.body.abilites.is_hidden,
            name : req.body.abilites.name,
            text : req.body.abilites.text
        },
        form : {
            images : req.body.form.images,
            name : req.body.form.name
        },
        height : req.body.height,
        stats : req.body.stats,
        types : req.body.types,
        weight : req.body.weight
    }
}
module.exports = router
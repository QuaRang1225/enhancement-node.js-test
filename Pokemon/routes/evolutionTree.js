const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const EvolTree = require('../models/evolution')

router.post('/',(req,res,next) =>{
    const pokemon = new EvolTree(requestValue(req))
    pokemon
    .save()
    .then(result => {
        res.status(201).json({
            status : 201,
            data : {},
            message : result.name + "의 진화트리 데이터 저장 완료"
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

router.get('/:evolId',(req,res,next) => {
    const id = req.params.evolId
    EvolTree.findById(id)
    .exec()
    .then(doc => {
        if (doc){
            res.status(200).json({
                status : 200,
                data:responseValue(doc),
                message : "정상적으로 포켓몬 진화트리를 조회했습니다."
            })
        }else{
            res.status(404).json({
                status : 404,
                message : "포켓몬 진화트리가 존재하지 않습니다."
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            status : 500,
            message : "포켓몬 진화트리 정보 요청이 실패했습니다."
        })
    })
})

router.patch("/:evolId",(req,res,next) => {
    const id = req.params.evolId
    const pokemon = requestValue(req)
    EvolTree.updateOne({ _id : id },pokemon)
    .exec()
    .then(result => {
        if (result.matchedCount > 0){
            res.status(200).json({
                status : 200,
                data:pokemon,
                message : "정상적으로 포켓몬 진화트리 정보를 수정했습니다."
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
            message : "포켓몬 진화트리 정보 수정이 실패했습니다."
        })
    }) 
})

router.delete("/:evolId",(req,res,next) => {
    const id = req.params.evolId
    EvolTree.deleteOne({ _id : id})
    .exec()
    .then(result => {
        if (result){
            res.status(200).json({
                status : 200,
                data:{},
                message : "정상적으로 포켓몬 진화트리 정보를 삭제했습니다."
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
            message : "포켓몬 진화트리 삭제 요청이 실패했습니다."
        })
    }) 
})

function requestValue(req){
    return {
        _id : req.body._id,
        evol_to : req.body.evol_to,
        image : req.body.image,
        name : req.body.name
    }
}

function responseValue(doc){
    return {
        _id : doc._id,
        evol_to : doc.evol_to,
        image : doc.image,
        name : doc.name
    }
}
module.exports = router
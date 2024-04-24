const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Pokemon = require('../models/pokemon')
const Varieites = require('../models/vaieites')


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
router.get('/', (req, res, next) => {
    const page = parseInt(req.query.page) || 1 // 페이지 번호, 기본값은 1
    const perPage = 20 // 페이지당 아이템 수

    Pokemon
        .countDocuments() // 전체 문서 수를 가져옴
        .then(totalCount => {
            Pokemon
                .find()
                .skip((page - 1) * perPage) // 스킵할 아이템 수 계산
                .limit(perPage) // 한 페이지에 반환할 아이템 수 제한
                .exec()
                .then(docs => {
                    const totalPages = Math.ceil(totalCount / perPage) // 전체 페이지 수 계산
                    const response = {
                        total_count: totalCount, // 전체 아이템 수
                        total_pages: totalPages, // 전체 페이지 수
                        current_page: page, // 현재 페이지 번호
                        per_page: perPage, // 페이지당 아이템 수
                        pokemon: docs.map(doc => {
                            return responseValue(doc)
                        })
                    };
                    res.status(200).json(response)
                })
                .catch(err => {
                    res.status(500).json({ error: err })
                })
        })
        .catch(err => {
            res.status(500).json({
                status : 500,
                data : {},
                message : "데이터를 불러오는데 실패했습니다."
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
        capture_rate: doc.capture_rate,
        dex_num: doc.dex_num,
        dex_region: doc.dex_region,
        egg_group: doc.egg_group,
        evolution_tree: doc.evolution_tree,
        forms_switchable: doc.forms_switchable,
        gender_rate: doc.gender_rate,
        genra: doc.genra,
        hatch_counter: doc.hatch_counter,
        name: doc.name,
        text_entries_text: doc.text_entries_text,
        text_entries_version: doc.text_entries_version,
        varieites: doc.varieites
    }
}
function requestValue(req){
    return {
        _id: req.body._id,
        capture_rate: req.body.capture_rate,
        dex_num: req.body.dex_num,
        dex_region: req.body.dex_region,
        egg_group: req.body.egg_group,
        evolution_tree: req.body.evolution_tree,
        forms_switchable: req.body.forms_switchable,
        gender_rate: req.body.gender_rate,
        genra: req.body.genra,
        hatch_counter: req.body.hatch_counter,
        name: req.body.name,
        text_entries_text: req.body.text_entries_text,
        text_entries_version: req.body.text_entries_version,
        varieites: req.body.varieites
    }
}

module.exports = router
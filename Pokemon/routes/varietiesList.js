const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Varieties = require('../models/varieties')


router.get('/', (req, res, next) => {
    const page = parseInt(req.query.page) || 1 // 페이지 번호, 기본값은 1
    const perPage = 20 // 페이지당 아이템 수



    Varieties
        .countDocuments() // 전체 문서 수를 가져옴
        .then(totalCount => {
            Varieties
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
                            return {
                                _id : doc._id
                            }
                        })
                    };
                    res.status(200).json({
                        status : 200,
                        data : response,
                        message :  "정상적으로 포켓몬 폼 리스트 정보를 조회했습니다."
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        status : 500,
                        data : {},
                        message : "포켓몬 폼 리스트 정보 요청이 실패했습니다."
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                status : 500,
                data : {},
                message : "포켓몬 폼 리스트 정보 요청이 실패했습니다."
            })
        })
})
router.delete("/",(req,res,next) => {
    Varieties.deleteMany({})
    .exec()
    .then(result => {
        if (result){
            res.status(200).json({
                status : 200,
                data:{},
                message : "정상적으로 모든 포켓몬 폼 정보를 삭제했습니다."
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
module.exports = router
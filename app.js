//Express 모듈을 불러옴
//Express는 Node.js를 위한 웹 애플리케이션 프레임워크로, HTTP 요청 및 응답을 처리하는 데 도움을 줌
const express = require('express')
//Express 애플리케이션을 생성
// express() 함수를 호출하여 새로운 Express 애플리케이션 객체를 만듬
const app = express()

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

const pokemonRoutes = require('./Pokemon/routes/pokemons')
const pokemonListRoutes = require('./Pokemon/routes/pokemonsList')
const treeRoutes = require('./Pokemon/routes/evolutionTree')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dbduddnd1225:'+ process.env.MONGO_ATLAS_PW+ '@node-rest-shop.kxjks0n.mongodb.net/')
// mongoose.Promise = global.Promise
// app.use((req,res,nest)=>{
    // res.header("Access-Control-Allow-Origin","*")
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    // )
    // if (req.method === 'OPTIONS'){
    //     res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
    //     return res.status(200).json({
            
    //     })
    // }
    // next()
// })

//Express 애플리케이션에 미들웨어를 추가
//이 미들웨어는 모든 요청에 대해 실행됨
//미들웨어는 요청 객체 req, 응답 객체 res, 그리고 다음 미들웨어 함수를 호출하는 콜백 함수 next를 인자로 받음
//이 미들웨어는 클라이언트가 서버에 HTTP 요청을 보낼 때마다 실행됨
// HTTP 응답 상태를 200으로 설정하고, JSON 형식으로 응답함. 응답으로 { message: 'It works!' } 객체를 보냄
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message: 'It wordks!'
//     })
// }) 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/products',productRoutes)
app.use('/orders',ordersRoutes)

app.use('/pokemon',pokemonRoutes)
app.use('/pokemons',pokemonListRoutes)
app.use('/tree',treeRoutes)

//새로운 오류 객체를 생성
//이 오류는 "Not found" 메시지를 가지고 있으며, 404 상태 코드로 설정
app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status = 404
    //다음 미들웨어로 오류를 전달
    //이를 통해 Express는 다음에 오류 처리 미들웨어로 이동
    next(error)
})


app.use((error,req,res,next)=>{
    //HTTP 응답 상태 코드를 설정
    //만약 오류 객체에 상태 코드가 설정되어 있지 않다면 기본값으로 500 (Internal Server Error)를 사용
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message
        }
    })
})
// Express 애플리케이션 객체를 모듈로 내보냄. 이렇게 함으로써 이 파일을 다른 파일에서 require하여 Express 애플리케이션을 사용할 수 있음
module.exports = app
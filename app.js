//Express 모듈을 불러옴
//Express는 Node.js를 위한 웹 애플리케이션 프레임워크로, HTTP 요청 및 응답을 처리하는 데 도움을 줌
const express = require('express')
//Express 애플리케이션을 생성
// express() 함수를 호출하여 새로운 Express 애플리케이션 객체를 만듬
const app = express()

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

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

app.use('/products',productRoutes)
app.use('/orders',ordersRoutes)
// Express 애플리케이션 객체를 모듈로 내보냄. 이렇게 함으로써 이 파일을 다른 파일에서 require하여 Express 애플리케이션을 사용할 수 있음
module.exports = app
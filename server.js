//Node.js의 내장 모듈 중 하나인 http 모듈을 불러옴
// 이 모듈을 사용하여 HTTP 서버를 생성하고 관리
const http = require('http')

//서버를 실행할 포트 번호 설정
//환경 변수 PORT의 값이 있으면 해당 값을 사용하고, 그렇지 않으면 기본값으로 3000을 사용
const port = process.env.PORT || 3000

//함수를 호출하여 HTTP 서버 인스턴스를 생성
// 이 서버는 클라이언트의 요청을 수신하고 응답을 제공하는 역할을 함
const server = http.createServer()

//서버가 지정된 포트에서 클라이언트의 요청을 수신할 수 있도록 대기
//서버를 시작하는 지점이며, listen() 함수는 포트 번호를 매개변수로 받아 해당 포트에서 서버를 시작
server.listen(port)
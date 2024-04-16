// console.log("hello,world")  

//어플리케이션에 필요한 모듈 불러오기
var http = require("http");

http.createServer(function(request,response){
    //헤더 설정
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    //바디 설정
    response.end("Hello, world")
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");
var fs = require('fs')

//readFile - 파일 비동기로 읽어들임
fs.readFile('input.txt', function(error,data){ 
    if (error) console.log(error)
    console.log(data.toString())
})

// var data = fs.readFileSync('input.txt')
// console.log(data.toString())
console.log("안뇽")
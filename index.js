const http = require('http')
const fs = require('fs')
const event = require('events')



const server = http.createServer()

server.listen(7000, '127.0.0.1', () => {
    console.log("http://localhost:"+'7000')
})

//not applicable for large file //app might crash
// server.on('request', (req, res) => {
//     fs.readFile('./Files/20M.txt', (err, data) => {
//         if(err) {
//             res.end("Something went wrong")
//         } else {
//             res.end(data)
//         }
//     })
// })

//Solutin: Using readable and writable stream-->
server.on('request', (req, res) => {
    let rs = fs.createReadStream('./Files/2M.txt')

    rs.on('data', (chunk) => {
        res.write(chunk)
        res.end()
    })

    //err handling
    rs.on('error', (err) =>{
        res.end(err.message)
    })
})


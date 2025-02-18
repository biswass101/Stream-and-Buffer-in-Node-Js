const http = require('http')
const fs = require('fs')
const event = require('events')



const server = http.createServer()

server.listen(7000, '127.0.0.1', () => {
    console.log("http://localhost:"+'7000')
})

//Solution1:
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

//Solutin2: Using readable and writable stream-->
//(cons: speed mismatch of readable and writable stream called backpressure)
// server.on('request', (req, res) => {
//     let rs = fs.createReadStream('./Files/20M.txt')

//     rs.on('data', (chunk) => {
//         res.write(chunk)
        
//     })

//     rs.on('end', () => {
//         res.end()
//     })

//     //err handling
//     rs.on('error', (err) =>{
//         res.end(err.message)
//     })
// })

//Solution3: Using Pipe
server.on('request', (req, res) => {
    let rs = fs.createReadStream('./Files/20M.txt')

    //here speed of the data passing and recieveing is controlled
    rs.pipe(res) 

    //err handling
    rs.on('error', (err) =>{
        res.end(err.message)
    })
})





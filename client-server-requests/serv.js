
var http = require('http')

var server = http.createServer(function(req, res){
  console.log('\n'+req.rawHeaders)
  res.end('Request accepted')
})

server.listen(3000)
console.log("Listening to port 3000 ...")

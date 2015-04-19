
var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname

var server = http.createServer(function(req, res){
  var url = parse(req.url).pathname
  if(url=='/') url='index.html'
  show(res, url)
})

server.listen(3000)
console.log("Listening to port 3000 ...")

function show(res, url) {
  var path = join(root, url)
  var body=""
  
  var stream=fs.createReadStream(path)
  stream.on('data',function(chunk){
    body+=chunk
  })
  
  stream.on('end',function(chunk){
    res.end(body)
  })
}
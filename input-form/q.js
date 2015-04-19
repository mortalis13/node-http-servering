
var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')
var qs = require('querystring')

var root = __dirname
var post = ""

var server = http.createServer(function(req, res){
  var url = parse(req.url).pathname
  if(url=='/') url='index.html'
  post=""

  switch(req.method){
    case 'GET':
      show(res, url)
      break
    case 'POST':
      doPost(req, res, url)
      break
  }
})

server.listen(3000)
console.log("Listening to port 3000 ...")

function doPost(req, res, url){
  if(url=='index.html'){
    var body = ''
    req.setEncoding('utf8')
    req.on('data', function(chunk){ body += chunk })
    req.on('end', function(){
      post = qs.parse(body)
      show(res, url)
    })
  }
}

function show(res, url) {
  var path = join(root, url)
  var body=""
  
  var stream=fs.createReadStream(path)
  stream.on('data',function(chunk){
    body+=chunk
  })
  
  stream.on('end',function(chunk){
    if(post && url=='index.html'){
      console.log('\nPOST data\n')
      for(var i in post){
        console.log(i+': '+post[i]+'')
      }
    }
    
    res.end(body)
  })
}
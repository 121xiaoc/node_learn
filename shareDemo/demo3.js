// 解析url
const url = require('url')
const http = require('http')

http.createServer(function(req, res) {
    const pathname = url.parse(req.url).pathname
    console.log(pathname)
    res.write('hello world')
    res.end()
}).listen(8888)


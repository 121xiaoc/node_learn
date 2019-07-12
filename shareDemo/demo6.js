// 前端上传test
const url = require('url')
const http = require('http')

function start (res) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(body)
    res.end()
}

function test1 (res) {
    res.write('test1')
    res.end()
}

const handle = {}
handle['/'] = start
handle['/test1'] = test1

function route (pathname, res) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](res)
    } else {
        res.writeHead(404)
        res.write('404')
        res.end()
    }
}

http.createServer(function(req, res) {
    const pathname = url.parse(req.url).pathname
    route(pathname, res)
}).listen(8888)


// 接收上传上来的 数据
const url = require('url')
const http = require('http')
const querystring = require('querystring')

function start (req, res) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload-text" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(body)
    res.end()
}

function test1 (req, res) {
    res.write('test1')
    res.end()
}

function uploadText (req, res) {
    var postData = ''
    req.on('data', function(data) {
        postData += data
    })
    req.on('end', function() {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write(querystring.parse(postData).text)
        res.end()
    })  
}

const handle = {}
handle['/'] = start
handle['/test1'] = test1
handle['/upload-text'] = uploadText

function route (pathname, req, res) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](req, res)
    } else {
        res.writeHead(404)
        res.write('404')
        res.end()
    }
}

http.createServer(function(req, res) {
    const pathname = url.parse(req.url).pathname
    route(pathname, req, res)
}).listen(8888)


// 构建路由模块
const url = require('url')
const http = require('http')

function start (res) {
    console.log('start')
    res.write('start')
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


// 构建路由模块
const url = require('url')
const http = require('http')

function start () {
    console.log('start')
}

function test1 () {
    console.log('test1')
}

const handle = {}
handle['/'] = start
handle['/test1'] = test1

function route (pathname) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname]()
    }
}

http.createServer(function(req, res) {
    const pathname = url.parse(req.url).pathname
    route(pathname)
    res.write('hello world')
    res.end()
}).listen(8888)

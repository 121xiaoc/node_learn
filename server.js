var http = require('http')
var url = require('url')

function start (route, handle) {
    var onRequest = function(request, response) {
        var pathName = url.parse(request.url).pathname
        route(pathName, handle, response, request)
    }
    http.createServer(onRequest).listen(8888)
}

exports.start = start;



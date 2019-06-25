function route (pathName, handle, responce, request) {
    if (typeof handle[pathName] === 'function') {
        handle[pathName](responce, request)
    } else {
        responce.writeHead(404, {
            'Content-type': 'text/plain'
        })
        responce.write('404 not found')
        responce.end()
    }
}

exports.route = route
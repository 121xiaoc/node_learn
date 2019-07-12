// 接收上传上来的 图片
const url = require('url')
const http = require('http')
const formidable = require("formidable");
const fs = require('fs')

function start (req, res) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload-img" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
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

function uploadImg (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        var readStream = fs.createReadStream(files.upload.path);
        var writeStream = fs.createWriteStream('./test.img');
        readStream.pipe(writeStream);
        readStream.on('end',function(){
            fs.unlinkSync(files.upload.path);
        });
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write("<img src='/show' />")
        res.end()
    })
}

function show (req, res) {
    fs.readFile('./test.jpg', function (error, file) {
       if (error) {
           res.writeHead(500)
           res.write('error')
           res.end()
       } else {
           res.writeHead(200, {
               'Content-Type': 'image/png'
           })
           res.write(file, 'binary')
           res.end()
       }
    })
}



const handle = {}
handle['/'] = start
handle['/test1'] = test1
handle['/upload-img'] = uploadImg
handle['/show'] = show

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


var fs = require("fs");
var formidable = require("formidable");
const path = require('path');

function start (response) {
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload (response, request) {
    var uploadDir = path.normalize(__dirname+'/'+"../firsrStep/tmp/test.jpg");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        var readStream=fs.createReadStream(files.upload.path);
        var writeStream=fs.createWriteStream(uploadDir);
        readStream.pipe(writeStream);
        readStream.on('end',function(){
            fs.unlinkSync(files.upload.path);
        });
        response.writeHead(200, {"Content-Type": "text/html"})
        response.write("received image:<br/>")
        response.write("<img src='/show' />")
        response.end()
    })
   
}

function show (response) {
    fs.readFile('./tmp/test.jpg', 'binary', function (error, file) {
        if (error) {
            response.writeHead(500, {
                'Content-type': 'text/plain'
            })
            response.write('error\n')
            response.end()
        } else {
            response.writeHead(200, {
                'Content-type': 'image/png'
            })
            response.write(file, 'binary')
            response.end()
        }
    })
}

exports.start = start
exports.upload = upload
exports.show = show
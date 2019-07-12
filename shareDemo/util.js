// 上传 text
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

// 上传 img
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

  const querystring = require('querystring')
  querystring.parse()

  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

  formidable = require("formidable");

  var form = new formidable.IncomingForm();

  form.parse(req, function(error, fields, files){})

  var readStream = fs.createReadStream(files.upload.path);
  var writeStream = fs.createWriteStream('./tmp/test.img');

  readStream.pipe(writeStream);
  readStream.on('end',function(){
      fs.unlinkSync(files.upload.path);
  });

  res.writeHead(200, {"Content-Type": "text/html"})
  res.write("<img src='/show' />")
  res.end()

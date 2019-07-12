
// 爬一个页面 获取章节列表
const url = require('url')
const http = require('http')

const cheerio = require('cheerio')
var charset = require('superagent-charset');
const superagent = charset(require('superagent'))

// get 请求
function get (url, data) {
    return new Promise ((resolve, reject) => {
        superagent
            .get(url)
            .query(data)
            .charset()
            .buffer(true)
            .then(res => {
                //console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    })
}

function start (req, res) {
    const body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/get-chapter-list" method="post">'+
    '<input type="submit" value="获取章节列表" />'+
    '</form>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(body)
    res.end()
}

function chapterList (req, res) {
    const url = 'https://www.69shu.org/book/5693/'
    get(url).then((htmlData) => {
        let message = []
        const $ = cheerio.load(htmlData.text)
        $('.chapterlist').find('li').map(function(i, elm) {
           var a = $(this).find('a')
           let item = {}
           if (a.length > 0) {
               item.href = url + a[0].attribs.href
               a[0].children && a[0].children.length > 0 && a[0].children[0].type === 'text' && (item.text = a[0].children[0].data)
               message.push(item)
           }
        })
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(message))
        res.end()
    })
}

const handle = {}
handle['/'] = start
handle['/get-chapter-list'] = chapterList


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


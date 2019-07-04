const cheerio = require('cheerio')

// 一个图片素材网
function parsePixabayData (html) {
    const $ = cheerio.load(html)
    var data = []
    $('.item').map(function (i, elm) {
        var img = $(this).find('img')
        if (img.length > 0) {
            img[0] && img[0].attribs && img[0].attribs.src && data.push(img[0].attribs.src) 
        }
    })
    return data
}

/**
 *  从69书吧获取小说的章节 
 * @param {*} html 
 */
function getNovalChapterIn69(html, preUrl) {
        let data = []
        const $ = cheerio.load(html)
        $('.chapterlist').find('li').map(function(i, elm) {
           var a = $(this).find('a')
           let item = {}
           if (a.length > 0) {
               item.href = preUrl + a[0].attribs.href
               a[0].children && a[0].children.length > 0 && a[0].children[0].type === 'text' && (item.text = a[0].children[0].data)
               data.push(item)
           }
        })
        return data;
}

/**
 * 获取69书吧的章节内容
 * @param {*} html html 内容
 */
function getNovalChapterContentIn69 (html) {
    let data = ''
    const $ = cheerio.load(html)
    console.log($('#htmlContent')[0].children)
    $('#htmlContent')[0].children.forEach(item => {
        if (item.type === 'text') {
            data += item.data.replace(/\s/g, '&nbsp;')
        } else if (item.type === 'tag' && item.name === 'br') {
            data += '<br/>'
        }
    })
    return data
}

module.exports = {
    parsePixabayData,
    getNovalChapterIn69,
    getNovalChapterContentIn69
}
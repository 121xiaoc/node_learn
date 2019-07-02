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
    try{
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
        return data
    } catch (e) {
        console.log(2)
        console.log(e)
    }

}

module.exports = {
    parsePixabayData,
    getNovalChapterIn69
}
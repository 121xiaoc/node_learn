const request = require('../request')

function getPixabayData () {
    return request.get('https://pixabay.com/images/search/?pagi=1')
}

/**
 * 获取 HTML 通过URL
 * @param url 想要爬取的地址
 */
function getHtmlByUrl (url) {
    return request.get(url)
}


function test () {
    return new Promise((res, rej) => {
        const time = new Date().getTime()
        while(new Date().getTime() - time < 10000000){}
        res()
    })
}

module.exports = {
    getPixabayData,
    test,
    getHtmlByUrl,
}
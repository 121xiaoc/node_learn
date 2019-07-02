const router = require('koa-router')()
const api = require('../utils/request/api.js')
const handleHtml = require('../utils/handleHtml')
const db = require('../utils/db')

router.prefix('/crawl')

// 爬虫测试
router.get('/test', async (ctx, next) => {
    const url = 'https://www.69shu.org/book/5693/'
    return api.getHtmlByUrl(url).then(res => {
        res.encoding = 'GBK'
        var data = handleHtml.getNovalChapterIn69(res.text, url)
        ctx.body = {
            code: '200',
            message: data
        }
    }).catch(e => {
        ctx.body = {
            code: '500' 
        }
    }) 
})

module.exports = router
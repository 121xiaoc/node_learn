const router = require('koa-router')()
const api = require('../utils/request/api.js')
const handleHtml = require('../utils/handleHtml')
const db = require('../db')

router.prefix('/crawl')

// 爬虫测试
router.get('/test', async (ctx, next) => {
    const url = 'https://www.69shu.org/book/5693/'
    return api.getHtmlByUrl(url).then(res => {
        var data = handleHtml.getNovalChapterIn69(res.text, url)
        return db.addNovalChaptersIn69(1, data).then(res => {
            ctx.body = {
                code: '200',
                message: '成功'
            }
        }).catch(res => {
            ctx.body = {
                code: '500',
                message: res
            }
        })
        
    }).catch(e => {
        ctx.body = {
            code: '500' 
        }
    }) 
})

// 测试单个 章节 内容的保存
router.get('/test2', async (ctx, next) => {
    const url = 'https://www.69shu.org/book/5693/2390810.html'
    return api.getHtmlByUrl(url).then(res => {
        var data = handleHtml.getNovalChapterContentIn69(res.text)
        return db.addNovalChaptersContentIn69('731', data).then(res => {
            ctx.body = {
                code: '200',
                message: data
            }
        })
    }).catch(e => {
        ctx.body = {
            code: '500',
            message: e 
        }
    }) 
})

// 测试获取 单个 章节 的 内容
router.get('/test3', async (ctx, next) => {
    const id = 731
    return db.selectNovelChapterContent(id).then(res => {
        res.length > 0 && (res = res[0])
        ctx.body = {
            code: 200,
            data: res
        }

    }).catch(e => {
        ctx.body = {
            code: 500,
            message: e 
        }
    })
})

module.exports = router
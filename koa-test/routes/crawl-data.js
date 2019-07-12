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

// 测试获取 小说的 章节列表
router.get('/test4', async (ctx, next) => {
    const id = 1
    return db.selectChapterList(id).then(res => {
        if (res.length > 0) {
            function seek (i) {
                var newRes = i + 5 < res.length ? res.slice(i, i + 5) : res.slice(i, res.length)
                Promise.all(newRes.map(item => {
                    return api.getHtmlByUrl(item.url)
                })).then(result => {
                    console.log('result:', result.map(item => {
                        return item.status
                    }))
                    if (result.length > 0) {
                        result.forEach((item, index) => {
                            var data = handleHtml.getNovalChapterContentIn69(item.text)
                            db.updateNovelChapterContent(res[i + index].id, data)
                            // console.log(res[i + index].id, item.status)
                        })
                    }
                    i + 5 < res.length ? console.log('继续') : console.log('结束')
                    i + 5 < res.length && seek(i + 5)
                }).catch(e => {
                    console.log('promise.all', e)
                }) 
            }
            seek(0)
        }
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

router.get('test5', function () {
    
})

module.exports = router
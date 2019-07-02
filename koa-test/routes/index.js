const router = require('koa-router')()
const api = require('../utils/request/api')
const handleHtml = require('../utils/handleHtml')
const db = require('../utils/db')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/api/getMessage', (ctx, next) => {
  return api.getPixabayData().then(res => {
    const data = handleHtml.parsePixabayData(res.text)
    return db.queryUserList().then(res => {
      ctx.body = {
        title: '200',
        message: data
      }
    })
  }).catch(e => {
    ctx.body = {
      title: '500',
      message: JSON.stringify(e)
    }
  })
})

module.exports = router

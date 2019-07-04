var charset = require('superagent-charset');
const superagent = charset(require('superagent'))

// post 请求 
function post (url, data) {
    return new Promise ((resolve, reject) => {
        superagent
            .post(url)
            .set('Content-Type', 'application/json')
            .send(data)
            // .set('Accept', 'application/json')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    })
}

// get 请求
function get (url, data) {
    return new Promise ((resolve, reject) => {
        superagent
            .get(url)
            .query(data)
            .charset()
            .then(res => {
                //console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            });
    })
}

module.exports = {
    post,
    get
}
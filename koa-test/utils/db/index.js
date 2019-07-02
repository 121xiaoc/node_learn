const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '47.111.187.105',
    user: 'root',
    password: '121896',
    database : 'read'
})

function queryUserList() {
    return new Promise((res, rej) => {
        connection.connect();
        connection.query('select * from user', function (error, results, fields) {
            console.log(fields)
            if (error) rej(error)
            res(results)
        })
        connection.end()
    })
}

/**
 *  保存69书吧的 小说 
 * @param {*} novalId 网站小说唯一键
 * @param {*} Chapters 章节列表
 */
function addNovalChaptersIn69 (novalSourceMergeId, Chapters) {
    return new Promise((res, rej) => {
        connection.connect();
        connection.end()
    })
}

module.exports = {
    queryUserList,
    addNovalChaptersIn69
}

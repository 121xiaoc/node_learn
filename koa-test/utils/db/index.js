const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '47.111.187.105',
    user: 'root',
    password: '121896',
    database : 'read'
})

var pool = mysql.createPool({
    host : '47.111.187.105',
    port : 3306,
    user: 'root',
    password: '121896',
    database : 'read'
});

function queryUserList() {
    return new Promise((res, rej) => {
        connection.connect();
        connection.query('select * from user', function (error, results, fields) {
            if (error) rej(error)
            res(results)
        })
        connection.end()
    })
}

/**
 *  保存69书吧的 小说 
 * @param {*} novalId 网站小说唯一键
 * @param {*} chapters 章节列表
 */
function addNovalChaptersIn69 (novalSourceMergeId, chapters) {
    return new Promise((res, rej) => {
        let list = chapters.map((item, index) => {
            return [ item.text, item.href, novalSourceMergeId, index]
        })
        connection.connect();
        const sql = "INSERT INTO chapter (name, url, noval_source_merge_id, number) VALUES ?"
        connection.query(sql, [list], function (err, rows, fields) {
            if (err) rej(err)
            res()
        })
        connection.end()
    })
}

/**
 * 保存内容到数据库
 * @param {*} novalChaptersId 章节 id 
 * @param {*} content 内容
 */
function addNovalChaptersContentIn69 (novalChaptersId, content) {
    return new Promise ((res, rej) => {
        const sql = "UPDATE chapter SET ? WHERE id = ?"
        connection.connect();
        connection.query(sql, [{content}, novalChaptersId], function (err, rows, fields) {
            if (err) rej(err)
            res()
        })
        connection.end()
    })
}

/**
 * 获取单个章节的内容
 * @param {*} chapterId 
 */
function selectNovelChapterContent (chapterId) {
    return new Promise((res, rej) => {
        const sql = "SELECT * FROM chapter WHERE id = ?"
        pool.getConnection(function(err, connection) {
            if (err) rej(err)
            connection.query(sql, [chapterId], function(err, rows) {
                connection.release();
                if (err) rej(err)
                res(rows)
            });
        });
    })
}

module.exports = {
    queryUserList,
    addNovalChaptersIn69,
    addNovalChaptersContentIn69,
    selectNovelChapterContent
}

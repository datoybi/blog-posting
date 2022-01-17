let db = require('./config')

async function getCofeInfo() {
    let query = 'SELECT * FROM cafe'
    let data = []
    let { rows } = await db.query(query)

    for(let row of rows){ // 배열안에 각각의 객체 삽입
        let node = {
            'id' : row['id'],
            'parent_id' : row['parent_id'],
            'text' : row['text'],
        }
        data.push(node)
    }

    return data
}


module.exports = {
    getCofeInfo
}
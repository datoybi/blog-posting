let db = require('./config')

// student 개수를 반환하는 메서드
async function getStudentCount() {
    let query = 'SELECT COUNT(*) FROM student' 
    let result = await db.query(query) 
    let data = result.rows[0].count

    return data
}

// student row들을 리턴하는 메서드
async function getStudentInfo(startPost, pagePerSize) {
    let query = `
    SELECT *
    FROM STUDENT
    LIMIT ${pagePerSize}
    OFFSET ${startPost}
    `
    let data = [] // 배열 만듦
    let { rows } = await db.query(query)

    for(let row of rows){ // 배열안에 각각의 객체 삽입
        let node = {
            'idx' : row['idx'],
            'name' : row['name'],
            'age' : row['age'],
            'grade' : row['grade'],
        }
        data.push(node)
    }
    
    return data
}


module.exports = {
    getStudentCount,
    getStudentInfo
}
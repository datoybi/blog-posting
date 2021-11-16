let db = require('./config')

// student 개수를 반환하는 메서드
async function getStudentCount() {
    let query = 'SELECT COUNT(*) FROM student' 

    let result = await db.query(query) // 쿼리 실행
    console.log(result.rows[0].count) // 5

    /* 이렇게 가져오는 방법도 있음 (위에 것과 같은 결과를 반환한다.) */
    // let {rows} = await db.query(query) 
    // console.log(rows[0].count)

    let data = result.rows[0].count // 5
    
    return data
}

// student row들을 리턴하는 메서드
async function getStudentInfo() {
    let query = 'SELECT * FROM student'
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

    // console.log(JSON.stringify(data))
    // [{"idx":1,"name":"김똘똘","age:":10,"grade":"B"},{"idx":2,"name":"이장님","age:":9,"grade":"A"},{"idx":3,"name":"홍길동\r\n","age:":11,"grade":"C"},{"idx":4,"name":"윤뽀뽀","age:":10,"grade":"A"},{"idx":5,"name":"박박","age:":9,"grade":"D"}] 
    return data
}


module.exports = {
    getStudentCount,
    getStudentInfo
}
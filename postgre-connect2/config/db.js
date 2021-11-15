const { Pool } = require('pg')

const pool = new Pool(
    {
        host: 'localhost',
        user: 'postgres',
        password: '1234',
        port: 5432,
        database: 'TEST'
    }
)

pool.query('SELECT * from student', (err, res) => {
    console.log(err, res)
    pool.end()
  })



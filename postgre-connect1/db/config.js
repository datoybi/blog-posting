const { Pool } = require('pg')

const pool = new Pool(
    {
        host: process.env.POSTGRE_HOST, 
        user: process.env.POSTGRE_USER,
        password: process.env.POSTGRE_PW,
        port: process.env.POSTGRE_PORT,
        database: process.env.POSTGRE_DB
    }
)

pool.query('SELECT * from student', (err, res) => {
    console.log(err, res)
    pool.end()
  })

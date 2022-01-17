var express = require('express');
var router = express.Router();
let db = require('../db/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });


  // db.connect()
});

module.exports = router;


// const db = new Pool(
//     {
//         host: 'localhost',
//         user: 'postgres',
//         password: '1234',
//         port: 5432,
//         database: 'TEST'
//     }
// )

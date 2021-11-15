var express = require('express');
var router = express.Router();
let db = require('../db/index')

/* GET home page. */
router.get('/', async function(req, res, next) {

  const count = await db.getStudentCount();
  console.log('in controller : '  + count) // 5

  const data = await db.getStudentInfo();
  console.log('in controller : '  + JSON.stringify(data))

  res.render('index', {count: count, data: data})
});

module.exports = router;

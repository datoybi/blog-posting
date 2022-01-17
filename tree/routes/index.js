var express = require('express');
var router = express.Router();
let db = require('../db/index')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index')
});

router.get('/getCafeInfo', async function(req, res, next) {

  const data = await db.getCofeInfo();
  // console.log(data)

  res.send(data) // send 로 해야되네 랜더로 하면 안받아졍
});

module.exports = router;

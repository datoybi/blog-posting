var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getParam', function(req, res, next) {
  let param = 'CALL getParam'
  res.render('index', { title: 'getParam' , param: param });
});

router.get('/getQuery', function(req, res, next) {
  let param = req.query.param
  console.log(param) 
  res.render('index', { title: 'getQuery' , param: param });
});

router.post('/getJson', function(req, res, next) {
  let param = req.body
  console.log(param.job) // developer
  console.log(param['old']) // old
  res.render('index', { title: 'getQuery' , param: param });
});

router.post('/getForm', function(req, res, next) {
  let name = req.body.name
  let old = req.body.old

  console.log(name) // developer
  console.log(old) // old
  res.render('index', { title: 'getForm' , name: name, old:old });
});




module.exports = router;

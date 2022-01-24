var express = require('express');
var router = express.Router();

// mount path가 없는 미들웨어. 모든 요청에 실행된다.
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// /user/:id path로 온 모든 HTTP method를 받는 미들웨어
router.use('/users/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// /user/:id path로 온 GET 방식만 받는 미들웨어 
router.get('/users/:id', function (req, res, next) {
  if (req.params.id == 0) next('route'); 
  // 파라미터가 0이면 next를 skip하고(미들웨어로 가는것을 중단하고) 다음 route로 전달 - special page로 렌더링됨
  else next(); 
}, function (req, res, next) { // index page로 렌더링
  res.render('index', { title: 'index page' });
});

// /user/:id path로 온 경우 special page로 랜더링 해주는 미들웨어
router.get('/users/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

module.exports = router;
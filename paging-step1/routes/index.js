var express = require('express');
var router = express.Router();
let db = require('../db/index')

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  let pagePerSize = 10 // 한 페이지에 보여질 게시물 수
  let currentPage = req.query.page; // 버튼 클릭할 때마다 가져오기 현재 보여지는 페이지
  let startPage = ((currentPage-1) * pagePerSize) + 1  // 시작 게시글 번호
  let endPage = (startPage + pagePerSize) - 1; // 끝 게시글 번호

  let paging = { // ejs로 전송하기위해 객체화
    'startPage' : startPage,
    'endPage' : endPage
  }

  res.render('index', {'paging': paging})
});

module.exports = router;

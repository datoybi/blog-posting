var express = require('express');
var router = express.Router();
let db = require('../db/index')

router.get('/', async function(req, res, next) {
  let currentPage = req.query.page; // 현재 보여지는 페이지
  if(!currentPage) currentPage = 1 // page 파라미터 값을 넘겨주지 않을 시, 1페이지로 설정
  let pagePerSize = 10 // 한 페이지에 보여질 게시물 수
  let pageBtnSize = 5 // 보여질 페이지 버튼의 개수 
  
  // 총 게시물 수
  let totalPageCnt = await db.getStudentCount()
  if (totalPageCnt < 0){
    totalPageCnt = 1
  }
  
  let totalPage = Math.ceil(totalPageCnt / pagePerSize) // 전체 페이지 수
  let totalSet = Math.ceil(totalPage / pageBtnSize) // 전체 세트 수
  let currentSet = Math.ceil(currentPage / pageBtnSize) // 현재 버튼 세트 번호 
  let startPage = ((currentSet-1) * pageBtnSize) + 1  // 시작 페이지 번호
  let endPage = (startPage + pageBtnSize) - 1 // 끝 페이지 번호
  let startPost = '' // db

  // DB에 들어갈 offset 설정
  if(currentPage < 0){
    startPost = 0
  } else {
    startPost = (currentPage - 1) * pagePerSize // 시작 게시글 번호
  }

  let data = await db.getStudentInfo(startPost, pagePerSize)
  // console.log(data)

  let paging = { // ejs로 전송하기위해 객체화
    'startPage' : startPage,
    'endPage' : endPage,
    'currentSet' : currentSet,
    'totalSet' : totalSet,
    'totalPage' : totalPage,
    'currentPage' : currentPage,
  }

  res.render('index', {'paging': paging, 'data': data})
});

module.exports = router;

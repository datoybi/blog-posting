//https://www.a-mean-blog.com/ko/blog/%EB%8B%A8%ED%8E%B8%EA%B0%95%EC%A2%8C/_/Node-JS-Multer%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C
var express  = require('express');
var router   = express.Router();
var multer   = require('multer');

var storage  = multer.diskStorage({
  destination(req, file, cb) { // 파일이 저장된 폴더	
    cb(null, 'uploadedFiles/');
  },
  filename(req, file, cb) { // destination 에 저장된 파일 명	
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
// enctype="multipart/form-data" 처음에는 텍스트만 하니까 안가졌는데 multer를 라우터 선언할 때 같이 선언하니까 됐다
let upload = multer({ dest: 'uploadedFiles/' }); // 파일이 저장될 폴더 설정, 이름이 무작위로 변함
let uploadWithOriginalFilename = multer({ storage: storage }); // 파일 명이 지정된 형식으로 변함 

router.get('/', function(req,res){
  res.render('upload');
});

router.post('/uploadFile', upload.single('attachment'), function(req,res){ 
  // upload.single 1개의 파일 저장 
  // attachment: <input type="file" class="form-control" name="attachment"> 이거저장
  console.log(req.body)
  console.log(req.body.title)

  res.render('confirmation', { file:req.file, files:null });
});

router.post('/uploadFileWithOriginalFilename', uploadWithOriginalFilename.single('attachment'), function(req,res){
  res.render('confirmation', { file:req.file, files:null });
});

router.post('/uploadFiles', upload.array('attachments'), function(req,res){
  // upload.array('attachments') 배열 저장
  res.render('confirmation', { file: null, files:req.files} );
});

router.post('/uploadFilesWithOriginalFilename', uploadWithOriginalFilename.array('attachments'), function(req,res){
  res.render('confirmation', { file:null, files:req.files });
});

module.exports = router;

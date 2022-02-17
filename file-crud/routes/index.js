let express  = require('express');
let router   = express.Router();
let multer   = require('multer');
let db = require('../db/index')
let storage  = multer.diskStorage({
  destination(req, file, cb) { // 파일이 저장된 폴더	
    cb(null, `${process.env.FILE_LOCATION}`);
  },
  filename(req, file, cb) { // destination 에 저장된 파일 명	
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
let upload = multer({ storage: storage }); // 파일 명이 지정된 형식으로 변함 

router.get('/', async function(req,res){
  res.render('upload');
});

router.post('/insertPost', upload.array('files'), async function(req,res){
  let {body} = req.body
  let title = JSON.parse(body).title
  let content = JSON.parse(body).content
  let isfile = '0'

  if(req.files.length != 0){
    isfile = '1'
  }
  let postPk = await db.insertPost(title, content, isfile) // post 추가
  if(isfile == '1'){ // 파일이 존재하면
    let fileName = []
    for(file of req.files) {
      fileName.push(file.filename)
    }
    await db.insertfile(postPk, fileName) // post 추가
  }

  res.send({'postPk':postPk})
});

router.get('/view', async function(req,res){
  const postPk = req.query.postPk

  let result = await db.selectPost(postPk) 
  console.log('!! ' + JSON.stringify(result))
// !! {"contents":[{"title":"1111","contents":"2222"}],"files":[{"location":"1645081091363__DDDDDDDD.jpg"}]}
 // 가지고와서 뿌려주고 UPDATE, 삭제 까지 해보기
  res.render('view');
});

module.exports = router;

let express  = require('express');
let router   = express.Router();
let multer   = require('multer');
let db = require('../db/index')
const fs = require('fs');
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
  console.log(JSON.stringify(result))
// !! {"contents":[{"title":"1111","contents":"2222"}],"files":[{"location":"1645081091363__DDDDDDDD.jpg"}]}
  res.render('view', {data: result, postPk: postPk});
});

router.get('/delete', async function(req,res){
  const postPk = req.query.postPk
  // 일단 post table의 isdelete값을 1로 update 하고 이미지들은 삭제해줬다.
  await db.deletePost(postPk)
  let files = await db.selectFiles(postPk)
  
  // 업로드된 파일 제거
  for(let file of files){
    fs.unlink(`${process.env.FILE_LOCATION}/${file.name}`, err => { 
      if(err){
        console.log('파일제거 에러 발생')
      }
    })
  }
  res.render('upload');
});

router.get('/update', async function(req,res){
  const postPk = req.query.postPk
  let result = await db.selectPost(postPk) 
  console.log(result)
  res.render('update', {data: result, postPk: postPk});
});

router.post('/updatePost', upload.array('files'), async function(req,res){
  let {body} = req.body
  let postPk = JSON.parse(body).postPk
  let title = JSON.parse(body).title
  let content = JSON.parse(body).content
  let isDBfile = await db.isFile(postPk)
  let oldFiles = JSON.parse(body).oldFiles
  let isNewFile = '0'
  let isFile = '1'
  console.log('old files (이미 파일이 있는것 중에 새로운 이미지): ' + JSON.stringify(oldFiles))
  console.log('new added files : ' + JSON.stringify(req.files))
  let dbFiles
  let dbFileLen

  console.log('isDBfILE : ' + isDBfile)
  if (isDBfile == '1'){
    dbFiles = await db.selectFiles(postPk)
    dbFileLen = dbFiles.length
    console.log('dbFiles : ' + dbFiles)

    for(let i=0; i < dbFiles.length; i++){
      for(let j of oldFiles){
        if(dbFiles[i].name == j) {
          dbFiles.splice(i, 1)
        }
      } 
    }
    if(dbFiles) {
      await db.updateOriginFiles(dbFiles) // db 삭제
      for(let file of dbFiles){ // 업로드 이미지 삭제
        fs.unlink(`${process.env.FILE_LOCATION}/${file.name}`, err => { 
          if(err){
            console.log('파일제거 에러 발생')
          }
        })
      }
  }
}


if(req.files.length != 0){
  isNewFile = '1'
}

if(isNewFile == '1'){ // 파일이 존재하면
  let fileName = []
  for(file of req.files) {
    fileName.push(file.filename)
  }
  await db.insertfile(postPk, fileName) // post 추가
}

let checkIsFile = await db.checkIsFile(postPk)
console.log('checkIsFile : ' + checkIsFile)

if(checkIsFile == '0') {
  isFile = '0'
}

await db.updatePost(title, content, isFile, postPk) // post 수정  

  res.send({'postPk':postPk})
});
module.exports = router;

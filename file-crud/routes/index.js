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

router.post('/post', upload.array('files'), async function(req,res){
  const {body} = req.body;
  const title = JSON.parse(body).title;
  const content = JSON.parse(body).content;
  let isFile = '0';

  console.log(req.files)
  if(req.files.length !== 0){
    isFile = '1';
  }
  // db에 post 추가
  const postId = await db.insertPost(title, content, isFile);
  // db에 파일 추가
  if(isFile === '1'){ 
    let fileArr = [];
    for(let file of req.files) {
      fileArr.push(file.filename);
    }
    await db.insertfile(postId, fileArr);
  }

  res.send({'postId':postId});
});

router.get('/post/:id', async function(req,res){
  const postId = req.params.id;
  const result = await db.selectPost(postId);
  res.render('view', {data: result, postId: postId});
});

router.delete('/post/:id', async function(req,res){
  const postId = req.params.id;
  
  // db에서 post 삭제
  await db.deletePost(postId);
  // 파일 여부 체크
  const isFile = await db.isFile(postId);
  if(isFile === '1') {
    const files = await db.selectFiles(postId);
  
    // 업로드된 파일 제거
    for(let file of files){
      fs.unlink(`${process.env.FILE_LOCATION}/${file.name}`, err => { 
        if(err){
          console.log('파일제거 에러 발생');
        }
      })
    }
    // db 파일 제거
    await db.deleteFile(postId);
  }
});

router.get('/post/:id/edit', async function(req,res){
  const postId = req.params.id;
  let result = await db.selectPost(postId);
  res.render('update', {data: result, postId: postId});
});

router.put('/post/:id', upload.array('files'), async function(req,res){
  const {body} = req.body;
  const postId = req.params.id;
  const title = JSON.parse(body).title;
  const content = JSON.parse(body).content;
  let isDBFile = await db.isFile(postId);
  const oldFiles = JSON.parse(body).oldFiles;
  let isNewFile = '0';
  let dbFiles;
  let isFile = '1'

  // 기존 파일 처리
  if (isDBFile === '1'){
    dbFiles = await db.selectFiles(postId);

    // 기존 파일중 삭제된 파일 구하기
    for(let i=0; i < dbFiles.length; i++){
      for(let j of oldFiles){
        if(dbFiles[i].name === j) {
          dbFiles.splice(i, 1);
        }
      } 
    }
    // 기존 파일에서 삭제된 파일이 있으면
    if(dbFiles) {
      // db 삭제
      await db.updateOriginFiles(dbFiles);
      // 업로드 이미지 삭제
      for(let file of dbFiles){ 
        fs.unlink(`${process.env.FILE_LOCATION}/${file.name}`, err => { 
          if(err){
            console.log('파일제거 에러 발생');
          }
        })
      }
    }
  }

  // 새로운 파일 처리
  if(req.files.length != 0){
    isNewFile = '1';
  }
  if(isNewFile == '1'){ 
    let newFiles = [];
    for(file of req.files) {
      newFiles.push(file.filename);
    }
    await db.insertfile(postId, newFiles);
  }

  // 파일이 존재하는지 체크해서 post의 file 컬럼에 반영
  const checkIsFile = await db.checkIsFile(postId);
  if(checkIsFile === '0') {
    isFile = '0';
  }
  await db.updatePost(title, content, isFile, postId);

  res.send({'postId':postId})
});

module.exports = router;

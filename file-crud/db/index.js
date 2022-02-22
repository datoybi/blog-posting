let db = require('./config')

async function getPostCount() {
    let query = 'SELECT COUNT(*) from posts' 
    let {rows} = await db.query(query)
    return rows[0].count
}

async function getFileCount() {
    let query = 'SELECT COUNT(*) FROM files' 
    let {rows} = await db.query(query)
    return rows[0].count
}

async function insertPost(title, content, isfile) {
    let postPk = Number(await getPostCount())+1
    let query = `INSERT INTO posts VALUES('${title}', '${content}', '${isfile}', '${postPk}', 0)`
    await db.query(query)
    return postPk
}

async function insertfile(postPk, fileName) {
    for(file of fileName){
        let filePk = Number(await getFileCount())+1
        let query = `INSERT INTO files VALUES('${postPk}', '${file}', '${filePk}')`
        await db.query(query)
    }
}

async function selectPost(postId) {
    const query = `SELECT * from posts WHERE post_pk = '${postId}' and isdelete = '0'`;
    const {rows} = await db.query(query);
    let contents = [];
    let files = "";

    let node = {
        title : rows[0].title,
        contents : rows[0].contents,
    }
    contents.push(node);
    
    if(rows[0].file === '1'){ // 파일이 있으면
        files = await selectFiles(postId);
    }

    return {
        contents : contents,
        files : files
    }
}
async function selectFiles(postId) {
    let query = `SELECT name FROM files WHERE post_pk = ${postId}`;
    let {rows} = await db.query(query);
    let files = [];

    for(let file of rows){
        let node = {
            name : file.name
        }
        files.push(node);
    }
    return files;
}

async function deletePost(postPk) {
    let query = `UPDATE posts SET isdelete=1 WHERE post_pk = ${postPk}`
    await db.query(query)
    let isfile = isFile(postPk)

    if(isfile == '1') {
        deleteFile(postPk)
    }
}

async function isFile(postPk) {
    let query = `SELECT file from posts WHERE post_pk = ${postPk}`
    let {rows} = await db.query(query)
    return rows[0].file
}

async function updateOriginFiles(files) { // update되는 것 중에 db에서 파일 삭제
    for(file of files) {
        console.log('db : ' + file.name)
        let query = ` DELETE FROM files
            WHERE name = '${file.name}'`
        await db.query(query)
    } 
}

async function deleteFile(postId) {
    let query = `DELETE FROM files WHERE post_pk = ${postId}`
    await db.query(query)
}

async function updatePost(title, content, isfile, postPk) {
    if(isFile(postPk) == '1'){ // 파일이 존재하면 다 삭제하기
        deleteFile(postPk)
    }

    let query = `UPDATE posts SET title = '${title}', contents = '${content}', file = '${isfile}'
    WHERE post_pk = ${postPk}`
    await db.query(query)
}

async function checkIsFile(postPk) {
    let query = `SELECT COUNT(*)
        FROM files
        WHERE post_pk = '${postPk}'`

    const {rows} = await db.query(query)
    return rows[0].count
}



module.exports={
    getPostCount,
    getFileCount,
    insertPost,
    insertfile,
    selectPost,
    selectFiles,
    deletePost,
    updatePost,
    isFile,
    updateOriginFiles,
    checkIsFile,
    deleteFile
}
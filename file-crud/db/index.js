let db = require('./config')

async function getPostCount() {
    let query = 'SELECT COUNT(*) FROM post' 
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
    let query = `INSERT INTO post VALUES('${title}', '${content}', '${isfile}', '${postPk}', 0)`
    await db.query(query)
    return postPk
}

async function insertfile(postPk, fileName) {
    // let fileLocation = `${process.env.FILE_LOCATION}`
    for(file of fileName){
        let filePk = Number(await getFileCount())+1
        let query = `INSERT INTO files VALUES('${postPk}', '${file}', '${filePk}')`
        await db.query(query)
    }
}

async function selectPost(postPk) {
    let query = `SELECT * FROM post WHERE post_pk = '${postPk}' and isdelete = '0'`
    let {rows} = await db.query(query)
    let contents = []
    let files

    let tmp = {
        title : rows[0].title,
        contents : rows[0].contents,
    }
    contents.push(tmp)
    
    if(rows[0].file == '1'){ // 파일이 있으면
        files = await selectFiles(postPk)
    }

    return {
        contents : contents,
        files : files
    }
}
async function selectFiles(postPk) {
    let query = `SELECT file_location FROM files WHERE post_pk = ${postPk}`
    let {rows} = await db.query(query)
    let files = []

    for(let file of rows){
        let tmp = {
            location : file.file_location
        }
        files.push(tmp)
    }
    return files
}

async function deletePost(postPk) {
    let query = `UPDATE post SET isdelete=1 WHERE post_pk = ${postPk}`
    await db.query(query)
    let isfile = isFile(postPk)

    if(isfile == '1') {
        deleteFile(postPk)
    }
}

async function isFile(postPk) {
    let query = `SELECT file FROM POST WHERE post_pk = ${postPk}`
    let {rows} = await db.query(query)
    return rows[0].file
}

async function deleteFile(postPk) {
    let query = `DELETE FROM files WHERE post_pk = ${postPk}`
    await db.query(query)
}

async function updatePost(title, content, isfile, postPk) {
    if(isFile(postPk) == '1'){ // 파일이 존재하면 다 삭제하기
        deleteFile(postPk)
    }

    let query = `UPDATE post SET title = '${title}', contents = '${content}', file = '${isfile}'
    WHERE post_pk = ${postPk}`
    await db.query(query)
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
    isFile
}
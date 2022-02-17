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
    let query = `INSERT INTO post VALUES('${title}', '${content}', '${isfile}', '${postPk}')`
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
    let query = `SELECT * FROM post WHERE post_pk = ${postPk}`
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


module.exports={
    getPostCount,
    getFileCount,
    insertPost,
    insertfile,
    selectPost,
    selectFiles
}
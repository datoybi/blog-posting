
let node = ``
let newData = []

$(function () {
    getData()
    // createTree() // 호출 하기

    $(document).on('click', '.list-group-item', (e) => {
        $(e.target).next('ul').toggleClass('hide') // hide 붙이고 떼기
        $('.list-group-item').removeClass('active') // active 붕이고 떼기
        $(e.target).addClass('active')

        if ($(e.target).next('ul').hasClass('hide')) { // + - 처리 
            $(e.target).find('span').text('+')
        } else {
            $(e.target).find('span').text('-')
        }
    });
})

    
async function getData(){
    try {   
        let data = await getAjax(`http://localhost:3000/getCafeInfo`)
        createTree(data)
    } catch (err) {
        console.log(err)
    }
}

async function createTree(data) {
    i = 0
    let jsonArray = []
    
    for(let i in data){
        if (data[i].parent_id == 'root'){
            jsonArray.push(data[i])
            
            for(let j in data){
                if (data[i].id == data[j].parent_id){
                    jsonArray.push(data[j])
                }
            }
            
        }
    }

    if(jsonArray){
        newData.push(jsonArray)
        i ++
    }

    console.log(JSON.stringify(newData))

    // while(true){
    //     console.log(i)
    //     if(i >= data.length) break

    //     for(let j in data){
    //         if (data[i].id == data[j].parent_id){
    //             jsonArray.push(data[j])
    //         }
    //     }
    //     console.log(JSON.stringify(jsonArray))
    
    //     if(jsonArray){
    //         newData.push(data[i])
    //         newData.push(jsonArray)
    //         i ++
    //     }
    
    // }
    
    // console.log(JSON.stringify(newData))
}
// async function createTree(data) {
//     console.log('data! : ' + JSON.stringify(data))
//     for (let i in data) {
//         let jsonArray = []

//         node += `<li class="list-group-item" id="${data[i].id}">${data[i].text}</li>`

//         for(let j in data){
//             if (data[i].id == data[j].parent_id){
//                 // console.log(JSON.stringify(data[j]))
//                 // id +=`{id: ${data[j].id}, parent_id: ${data[j].parent_id}}`
//                 jsonArray.push(data[j])
//         }
//     }
//     if(jsonArray.length >=1){
//         node += `<ul class="list-group hide">`
//         createTree(jsonArray) // 재귀
//         node += `</ul>` 
//     }
//     // console.log('jsonArray : ' , JSON.stringify(jsonArray))
//     // createTree(jsonArray)

//         // if (data[i].children) {
//         //     node += `<ul class="list-group hide">`
//         //     createTree(data[i].children) // 재귀
//         //     node += `</ul>`
//         // }
//     }
//     $("#root").html(node)
// }

function getAjax(url, params){
    return new Promise((resolve, reject) => { //프로미스 선언
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            data: params,
            success:(res) => {
                resolve(res)
            },
            error: (e) => {
                reject(e)
            }
        })
    })
}
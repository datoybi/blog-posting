let fileList = []

// 게시물 작성 섬네일 세팅
function setThumbnail(event) { 
    for (let image of event.target.files) { 
        fileList.push(image);
        let reader = new FileReader(); 
        reader.onload = function(event) { 
            let div = document.createElement("div");
            div.setAttribute("style", "width: 110px; height: 100px; float: left;");
            div.id = image.name;

            let img = document.createElement("img"); 
            img.setAttribute("src", event.target.result); 
            img.setAttribute("width", "100px");
            img.setAttribute("height", "100px");
            img.setAttribute("style", "margin-right: 10px;");     

            let delBtn = document.createElement("p"); 
            delBtn.setAttribute("style", "position: relative; top: -108px; left: 90px; font-size: 15px; width:22px; cursor: pointer;");
            delBtn.setAttribute("onclick", "onclickDelBtn(event)");
            delBtn.innerText = "⛔";

            div.append(img);
            div.append(delBtn);
            document.querySelector("div#image_container").appendChild(div); 
        }; 
        reader.readAsDataURL(image); 
    } 
}

function onclickDelBtn(event){
    let closeDiv = event.target.closest("div")
    closeDiv.style.display = "none";
    for (var i = 0; i<fileList.length; i ++ ) {
        if (closeDiv.id == fileList[i].name) {
            fileList.splice(i, 1);
        }
    }
}

async function formSubmit() {
    let formData = new FormData()
    const temp = JSON.stringify({ // input data 넣기
        title: document.getElementById("title").value, 
        content : document.getElementById("content").value
     });
    for (let i = 0; i < fileList.length; i++) { // file data 넣기
        formData.append('files', fileList[i]);
    }
    formData.append('body', temp);
    formData.append('files', fileList);
    makeRequest(formData, 'post', 'post', resultCb);
}

function makeRequest(formData, method, url, callback) { // ajax
    httpRequest = new XMLHttpRequest();
    if(!httpRequest) {
      alert('XMLHTTP 인스턴스를 만들 수가 없음');
      return false;
    }
    httpRequest.responseType = 'text';
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === httpRequest.DONE) {
            if (httpRequest.status === 200) {
                callback(JSON.parse(httpRequest.responseText).postId);
            }
        }
    };
    httpRequest.open(method, url);
    httpRequest.send(formData);
}

function resultCb(value) { 
    location.href=`/post/${value}`;
}

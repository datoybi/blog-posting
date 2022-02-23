let images;
let imgId;
let slideIdx;

window.onload = function(){
    const postId = document.getElementById("postId");
    const backBtn = document.getElementById("backBtn");
    backBtn.onclick = function(){
        location.href=`/`;
    };

    const updateBtn = document.getElementById("updateBtn");
    updateBtn.onclick = function(){
        // location.href는 get만 가능
        location.href=`/post/${postId.value}/edit`;
    };

    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.onclick = function(){
        if(window.confirm("삭제하시겠습니까?")) { 
            alert('삭제되었습니다');
            fetch(`/post/${postId.value}`, {
                method: 'DELETE',
            })
            location.href=`/`;
        }
    };
};

function imageClick(e){
    // popup 보이게 설정
    let imgDetail = document.getElementById("imgDetail");
    imgDetail.classList.remove('hide');
    // src, name 세팅
    const modalSrc = document.getElementById("modalSrc");
    modalSrc.setAttribute("src", e.src); 
    const name = String(e.src).split('__');
    // uri decoding 
    const modalName = document.getElementById("modalName");
    modalName.textContent = decodeURI(name[1]);
    // close 버튼 세팅
    const close = document.getElementsByClassName("modal-close");
    close[0].onclick = function() {
        imgDetail.classList.add('hide');
    }
    // download 버튼 세팅
    const downloadUri = document.getElementsByClassName("modal-download");
    downloadUri[0].setAttribute("href", e.src);
    downloadUri[0].setAttribute("download", decodeURI(name[1]));

    // 화살표 세팅
    const arrow = document.getElementsByClassName("modal-arrow");
    images = document.getElementsByClassName("viewer-image");

    if(images.length > 1){
        arrow[0].classList.remove('hide')
        arrow[1].classList.remove('hide')
    } else {
        arrow[0].classList.add('hide')
        arrow[1].classList.add('hide') 
    }
    // 현재 id setting
    const imgArr = String(e.id).split('img')
    imgId = imgArr[1]
    slideIdx = Number(imgId)
}

function plusSlides(n){    
    showSlides(slideIdx += n);
}

function showSlides(n){
    // image 길이보다 더 크면 
    if(n > images.length) {
        slideIdx = 1;
    // image 길이보다 작으면
    } else if(n < 1) {
        slideIdx = images.length;
    }
    const nextImg = document.getElementById(`img${slideIdx}`);
    nextImg.click()
}

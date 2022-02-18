
window.onload = function(){
    let postPk = document.getElementById("postPk")
    let backBtn = document.getElementById("backBtn")
    backBtn.onclick = function(){
        location.href=`/`
    };

    let updateBtn = document.getElementById("updateBtn")
    updateBtn.onclick = function(){
        location.href=`/update?postPk=${postPk.value}`
    };

    let deleteBtn = document.getElementById("deleteBtn")
    deleteBtn.onclick = function(){
        if(window.confirm("삭제하시겠습니까?")) { 
            alert('삭제되었습니다')
            location.href=`/delete?postPk=${postPk.value}`
        }
    };

};



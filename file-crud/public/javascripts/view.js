
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

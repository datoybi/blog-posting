// http://localhost:3000/tree/index.html

const data = [
    { id: 56, parentId: 62 },
    { id: 81, parentId: 80 },
    { id: 74, parentId: null },
    { id: 76, parentId: 80 },
    { id: 63, parentId: 62 },
    { id: 80, parentId: 86 },
    { id: 87, parentId: 86 },
    { id: 62, parentId: 74 },
    { id: 86, parentId: 74 },
];

/* idMapping
해당 id의 부모의 index를 찾기위해 사용
{
    56: 0, 
    62: 7, 
    63: 4, 
    74: 2, 
    76: 3, 
    80: 5, 
    81: 1, 
    86: 8, 
    87: 6
} 
*/

// 요소의 id를 배열 인덱스에 매핑 
// 예를들어... 56(0번째 인덱스이기 때문에): 0, 81: 1, 74: 2 ...
const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
}, {}); // {56: 0, 62: 7, 63: 4, 74: 2, 76: 3, 80: 5, 81: 1, 86: 8, 87: 6} 
// 오 키순서로 정렬이 되니까 신기하다..

let root;
const makeTree = data.forEach((el) => {
    // 루트인 경우
    if (el.parentId === null) {
        el.parentId = "ROOT";
        root = el;
        return;
    }
    // idMapping으로 현재 el의 parrentId의 위치 찾기 
    const parentEl = data[idMapping[el.parentId]];
    // console.log('parentEl : ' + JSON.stringify(parentEl));

    // 현재 el을 parentEl의 children으로 넣는다.
    parentEl.children = [...(parentEl.children || []), el];
    // console.log('children : ' + JSON.stringify(parentEl.children));
});

let node = ``;
const $myDiv = document.querySelector("#myDiv");

const drawTree = (data) => {
    for (let i in data) {
        node += `<li class="${data[i].parentId}">${data[i].id}`
        if (data[i].children) {
            node += `<ul>`
            drawTree(data[i].children) // 재귀
            node += `</ul>`
        }
        node += `</li>`;
    }
    $myDiv.innerHTML = node;
}

window.onload = () =>{        
    const data = [];
    data.push(root);

    console.log('root : ' + JSON.stringify(data));
    drawTree(data);
}
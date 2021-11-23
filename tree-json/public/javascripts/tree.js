
const data =
    [{
        "id": 'baverage',
        "text": "음료",
        "children": [{
            "id": 'coldbrew',
            "text": "콜드 브루",
            "children": [
                {
                    "id": 'coldbrew1',
                    "text": "토피 넛 콜드 브루"
                },
                {
                    "id": 'coldbrew2',
                    "text": "나이트로 바닐라 크림"
                },
                {
                    "id": 'coldbrew3',
                    "text": "제주 비자림 콜드 브루"
                },
                {
                    "id": 'coldbrew4',
                    "text": "콜드 브루 몰트"
                }
            ]
        },
        {
            "id": 'brewedcoffee',
            "text": "부르드 커피",
            "children": [
                {
                    "id": 'brewedcoffee1',
                    "text": "아이스 커피"
                },
                {
                    "id": 'brewedcoffee2',
                    "text": "오늘의 커피"
                }
            ]
        },
        {
            "id": 'espresso',
            "text": "에스프레소",
            "children": [
                {
                    "id": 'espresso1',
                    "text": "바닐라 빈 라떼"
                },
                {
                    "id": 'espresso2',
                    "text": "돌체 라떼"
                },
                {
                    "id": 'espresso3',
                    "text": "아메리카노",
                    "children": [
                        {
                            "id": 'espresso3_hot',
                            "text": "따뜻한 아메리카노"
                        },
                        {
                            "id": 'espresso3_ice',
                            "text": "시원한 아메리카노"
                        }
                    ]
                },
                {
                    "id": 'espresso4',
                    "text": "카라멜 마키아또"
                },
                {
                    "id": 'espresso5',
                    "text": "카페 모카"
                },
                {
                    "id": 'espresso6',
                    "text": "아포가토"
                },
                {
                    "id": 'espresso7',
                    "text": "사케라또 "
                },
                {
                    "id": 'espresso8',
                    "text": "화이트 초콜릿 모카"
                },
                {
                    "id": 'espresso9',
                    "text": "플랫 화이트"
                }
            ]
        },
        {
            "id": 'frappuccino',
            "text": "프라프치노"
        },
        {
            "id": 'blended',
            "text": "블렌디드"
        },
        {
            "id": 'tea',
            "text": "티(티바나)"
        },
        {
            "id": 'juice',
            "text": "주스(병음료)"
        }
        ]
    },
    {
        "id": 'food',
        "text": "푸드",
        "children": [{
            "id": 'bread',
            "text": "브레드"
        },
        {
            "id": 'cake',
            "text": "케이크"
        },
        {
            "id": 'sandwich',
            "text": "샌드위치 & 샐러드"
        },
        {
            "id": 'warmfood',
            "text": "따뜻한 푸드"
        },
        {
            "id": 'fruit',
            "text": "과일 & 요거트"
        },
        {
            "id": 'snack',
            "text": "스낵 & 미니 디저트"
        },
        {
            "id": 'icecream',
            "text": "아이스크림"
        }]
    },
    {
        "id": 'product',
        "text": "상품"
    },
    {
        "id": 'card',
        "text": "카드",
        "children": [
            {
                "id": 'realcard',
                "text": "실물카드"
            },
            {
                "id": 'e-gift',
                "text": "e-Gift"
            }
        ]
    },
    ];

let node = ``

$(function () {

    createTree(data) // 호출 하기

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

    function createTree(data) {
        for (let i in data) {
            if (data[i].children) { // 자식이 있으면 + 추가
                node += `<li class="list-group-item" id="${data[i].id}"><span>+</span> ${data[i].text}</li>`
            } else {
                node += `<li class="list-group-item" id="${data[i].id}">${data[i].text}</li>`
            }

            if (data[i].children) {
                node += `<ul class="list-group hide">`
                createTree(data[i].children) // 재귀
                node += `</ul>`
            }
        }
        $("#root").html(node)
    }
})
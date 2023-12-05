// 확장 프로그램 옵션 메뉴
let page = document.getElementById('buttonDiv');

function constructOptions(colorList) {
    console.log('item(color): ' + colorList);
    for (let item of colorList) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        console.log('item(color): ' + item);
        button.addEventListener('click', function () {
            chrome.storage.sync.set({ color: item }, function () {
                console.log('color is ' + item);
            })
        });
        page.appendChild(button);
    }
}
constructOptions(colorList);

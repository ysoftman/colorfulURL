// console.log() 는 앱 -> '팝업검사' 로 열린 디버거 창에서 확인하는데,
// 탭을 이동하면 닫히기 때문에
// console.log("ysoftman");
// 아래와 같이 앱의 백그라운드 페이지로 console 로그를 찍어 확인한다.
// chrome.extension.getBackgroundPage().console.log("ysoftman");
let backpage = chrome.extension.getBackgroundPage();

let colors = {
    green: '#28a745',
    red: '#e8453c',
    yellow: '#f9bb2d',
    blue: '#4688f1',
    cyan: '#00bcd4',
    purple: '#9933cc'
}

const colorList = [
    colors.green,
    colors.red,
    colors.yellow,
    colors.blue,
    colors.cyan,
    colors.purple
];

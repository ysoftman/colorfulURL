/*
console.log() 는 앱 -> '팝업검사' 로 열린 디버거 창에서 확인하는데,
탭을 이동하면 팝업 검사 창이 닫히기 때문에 불편하다.
console.log("ysoftman");

아래와 같이 앱의 백그라운드 페이지로 console 로그를 찍어 확인한다.
chrome.extension.getBackgroundPage().console.log("ysoftman");

manifest.json background->persistent: false 인 경우
chrome.extension.getBackgroundPage() 사용시 null 리턴할 수 있다.
하지만 persistent:true 로 하면 리소스를 계속 사용하기 때문에
chrome.webRequest 를 사용하지 않는다면 persistent:false 를 권고한다.
https://developer.chrome.com/extensions/background_pages
*/
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

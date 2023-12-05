const enabled_text = "ysoftman blogger seach: enabled\r\nex) ysoftman linux";
const disabled_text = "ysoftman blogger search: disabled";

let shortcut = document.getElementById('shortcut');
let enable_blogger_search = document.getElementById('enable_blogger_search');
let colorizeURL = document.getElementById('colorizeURL');

enable_blogger_search.setAttribute('style', 'white-space: pre;');

function setShortCutDisplay() {
    // host os 파악
    chrome.runtime.getPlatformInfo(function (info) {
        console.log("platformInfo:", info);
        osName = info.os;
        let shortcut_text = 'ctrl+shift+u';
        if (osName == 'mac') {
            shortcut_text = 'command+shift+u';
        }
        shortcut.textContent = 'show this Popup : ' + shortcut_text;
    });
}
setShortCutDisplay();

chrome.storage.sync.get('color', function (data) {
    enable_blogger_search.style.backgroundColor = data.color;
    enable_blogger_search.setAttribute('value', data.color);
    // alert("color : " + data.color)
    console.log("color : ", data.color);
});

function getEnable() {
    chrome.storage.sync.get('enable_blogger_search', function (data) {
        if (data.enable_blogger_search) {
            enable_blogger_search.style.backgroundColor = colors.green;
            enable_blogger_search.textContent = enabled_text
        } else {
            enable_blogger_search.style.backgroundColor = colors.red;
            enable_blogger_search.textContent = disabled_text
        }
    });
}
getEnable();

enable_blogger_search.onclick = function () {
    chrome.storage.sync.get('enable_blogger_search', function (data) {
        data.enable_blogger_search = !data.enable_blogger_search;
        chrome.storage.sync.set({ enable_blogger_search: data.enable_blogger_search }, function () {
            if (data.enable_blogger_search) {
                enable_blogger_search.style.backgroundColor = colors.green;
                enable_blogger_search.textContent = enabled_text
            } else {
                enable_blogger_search.style.backgroundColor = colors.red;
                enable_blogger_search.textContent = disabled_text
            }
        });
    });
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    console.log("url:", url);
    makeColorfulURL(colorizeURL, url);
});


function makeColorfulURL(parentele, url) {
    let myURL = new URL(url)
    let protocol = myURL.protocol.toString()
    let hostname = myURL.hostname.toString()
    let path = myURL.pathname.toString()
    let params = myURL.searchParams.toString()
    console.log("protocol:", protocol);
    console.log("hostname:", hostname);
    console.log("path:", path);
    console.log("params:", params);

    let eleCnt = 0;
    let colorizeURL = protocol + "//";
    ++eleCnt;
    colorizeURL += "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + hostname + "/</div>";

    let pathArr = path.split('/');
    // console.log("pathArr:", pathArr);
    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i] === '') continue;
        ++eleCnt;
        let ele = "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + pathArr[i];
        if (i != pathArr.length - 1) {
            ele += "/";
        }
        ele += "</div>";
        colorizeURL += ele;
        console.log("ele[", i, "]: ", ele);
    }
    let paramsArr = params.split('\&');
    // console.log("paramsArr:", paramsArr);
    for (let i = 0; i < paramsArr.length; i++) {
        ++eleCnt;
        let ele = "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + paramsArr[i];
        if (i != paramsArr.length - 1) {
            ele += "&";
        }
        ele += "</div>";
        colorizeURL += ele;
        console.log("ele[", i, "]: ", ele);
    }

    parentele.innerHTML = "[colorized URL]<br>";
    parentele.innerHTML += colorizeURL;

    let decodedURL = "<br><br>[decodeURIComponent]<br>";
    decodedURL += colorizeURL;
    parentele.innerHTML += decodeURIComponent(decodedURL);

}

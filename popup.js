// let imported = document.createElement('script');
// imported.src = 'common.js';
// document.head.appendChild(imported);

let shortcut = document.getElementById('shortcut');
let changeColor = document.getElementById('changeColor');
let colorizeURL = document.getElementById('colorizeURL');

function setShortCutDisplay() {
    let shortcut_text = 'ctrl+shift+u';
    if (osName == 'mac') {
        shortcut_text = 'command+shift+u';
    }
    shortcut.textContent = 'show this Popup : ' + shortcut_text;
}
setShortCutDisplay();

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
    // alert("color : " + data.color)
    backpage.console.log("color : ", data.color);
});

changeColor.onclick = function () {
    chrome.storage.sync.get('enable', function (data) {
        data.enable = !data.enable;
        chrome.storage.sync.set({ enable: data.enable }, function () {
            backpage.console.log("blogger seach enable : ", data.enable);
            if (data.enable) {
                changeColor.style.backgroundColor = colors.green;
                changeColor.textContent = "blogger seach: enabled"
            } else {
                changeColor.style.backgroundColor = colors.red;
                changeColor.textContent = "blogger search: disabled"
            }
        });
    });
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    backpage.console.log("url:", url);
    makeColorfulURL(colorizeURL, url);
});


function makeColorfulURL(parentele, url) {
    scheme = url.split('//');
    path = scheme[scheme.length - 1].split('/');
    query = path[path.length - 1].split('\?');
    params = query[query.length - 1].split('\&');
    backpage.console.log("scheme:", scheme);
    backpage.console.log("path:", path);
    backpage.console.log("query:", query);
    backpage.console.log("params:", params);
    parentele.innerHTML += scheme[0] + "//";
    eleCnt = 0;
    for (let i = 0; i < path.length; i++) {
        ++eleCnt;
        let ele = "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + path[i];
        if (i == path.length - 1) {
            if (query.length > 0) {
                continue;
            }
            ele += "</div>";
        } else {
            ele += "/</div>";
        }
        parentele.innerHTML += ele;
        backpage.console.log("ele[", i, "]: ", ele);
    }
    if (query.length == 2) {
        ++eleCnt;
        let ele = "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + query[0];
        ele += "?</div>";
        parentele.innerHTML += ele;
        backpage.console.log("ele[", 0, "]: ", ele);
    }
    for (let i = 0; i < params.length; i++) {
        ++eleCnt;
        let ele = "<div style=color:" + colorList[eleCnt % colorList.length] + "\>" + params[i];
        if (i == params.length - 1) {
            ele += "</div>";
        } else {
            ele += "&</div>";
        }
        parentele.innerHTML += ele;
        backpage.console.log("ele[", i, "]: ", ele);
    }
}

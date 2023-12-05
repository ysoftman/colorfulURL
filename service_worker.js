// 순수(vanilla) javascript 에서는 
// html 통해서만 javascript 파일을 include 할 수 있다.
// manifest V3 에선 에러 발생! (추후 삭제)
//let imported = document.createElement('script');
//imported.src = 'common.js';
//document.head.appendChild(imported);

import './common.js';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set(
    {
      enable: true,
      color: '#3aa757'
    }, function () {
      console.log("Hello colorful URL~");
    });
});

// Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.
chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      // developer.chrome.com URL 에서만 버튼 활성화
      // pageUrl: { hostEquals: 'developer.chrome.com' },
      pageUrl: { schemes: ['https', 'http'] },

    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});


chrome.commands.onCommand.addListener(function (command) {
  console.log("shortcut:", command);
});


chrome.omnibox.onInputEntered.addListener(function (query, target) {
  console.log("query:", query, "  target:", target);
  chrome.storage.sync.get('enable_blogger_search', function (data) {
    if (data.enable_blogger_search == false) {
      console.log("enable_blogger_search : disabled...")
      return;
    }
    let gotourl = 'https://yoonbh2714.blogspot.com/search?q=' + query;
    // chrome.tabs.create({ url: gotourl });
    // 현재 탭에서 URL 로 이동
    chrome.tabs.update({ url: gotourl })
  })
});

// 순수(vanilla) javascript 에서는 
// html 통해서만 javascript 파일을 include 할 수 있다.
let imported = document.createElement('script');
imported.src = 'common.js';
document.head.appendChild(imported);

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
      pageUrl: { schemes: ['https', 'https'] },

    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});



chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  backpage.console.log("text:", text, "  disposition:", disposition);
  chrome.storage.sync.get('enable', function (data) {
    if (data.enable == false) {
      backpage.console.log("disabled...")
      return;
    }
    let gotourl = 'https://yoonbh2714.blogspot.com/search?q=' + text;
    // chrome.tabs.create({ url: gotourl });
    // 현재 탭에서 URL 로 이동
    chrome.tabs.update({ url: gotourl })
  })
});

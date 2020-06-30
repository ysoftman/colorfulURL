# Colorful URL (chrome extension)

## 설치

- chrome://extensions/ -> 개발자 모드 활성화 -> 압축해제된 확장 프로그램을 로드합니다.(LOAD UNPACKED) -> 프로젝트 디렉토리 선택

## 디버깅

- 코드 수정 후 chrome://extensions/ 에서 '업데이트' 하면 바로 적용된다.
- 앱의 '백그라운드 페이지' 에서 콘솔 로그를 확인한다.

## 기능

- 현재 URL을 컬러로 구분해 보여준다.

  ![colorfulURL-screenshot1](./colorfulURL-screenshot1.png)

- 주소표시줄(omni box)에서 ysoftman + 공백 + 키워드를 쓰면 ysoftman 블로그에서 검색한다.

  ex) ysoftman linux

  ![colorfulURL-screenshot2](./colorfulURL-screenshot2.png)

## 크롬 웹스토어 배포

- zip 압축

 ```bash
 cd ~/workspace/
 zip -r colorfulURL.zip colorfulURL -x "*.git*"
 ```

- <https://chrome.google.com/webstore/devconsole/> 에서 새항목 -> colorfulURL.zip 추가

## 확장프로그램 패키지(.crx) 생성

- 크롬 웹스토어에 배포되면 crx 파일을 만들어 설치에 사용할 수 있다.(배포되지 않으면 크롬에서 설치는돼도 활성화 되지 않는다.)
- chrome://extensions/ -> 개발자 모드 활성화 -> 확장프로그램 압축하면 다음 파일이 생성된다.
  - 확장 프로그램: /Users/ysoftman/workspace/colorfulURL.crx
  - 키 파일: /Users/ysoftman/workspace/colorfulURL.pem

## references

- <https://developer.chrome.com/extensions/getstarted>
- <https://developer.chrome.com/extensions/devguide>
- <https://developer.chrome.com/extensions/omnibox>

# SKKU-ISE-Team4

# Node.js server
 1. npm install
 2. npm start로 실행
 3. 아이캠퍼스 계정으로 로그인 하면 자신의 구글캘린더 나오게 설정
 4. 암호화는 require문제로 아직 적용 못함

# Google Calender 연동
## 현재 DB에서 데이터 가져와서 보낼수 있는 함수 구현했음, googleCalender.js에 DB형식 있습니다. 
## google 캘린더 googleCalender.js 처음실행시, credentials.json 필요하고 token.js생성되실 겁니다.  
## 송영보한테 말하셔서 google api에 gmail등록하셔야 결과 보실수 있습니다. 

# 학사공지 크롤링
## 현재 키워드넣고 parsing함수 실행시, 학사공지 페이지에서 공지 10개에 대한 제목, 링크, 날짜, 내용 긁어와서 배열에 저장해두는거 구현완료

# 아이캠퍼스 크롤링
## 즐겨찾기 과목정보 크롤링은 완료인데, 과제란에서 예정된 과제 목록불러오기가 어려움....이유를 모르겠음...
KeySchool ver 1.1

Log in / Register => DB 연동 필요, 틀만 구현

Calendar
  - 현재 제 구글 캘린더에 연결되어 있습니다. DB 연동이 되면 Calendar.html의 아래 부분에서 drw005526부분을 다른 구글 계정 아이디로 바꾸면 해당 구글 캘린더로 연결됩니다.
  - <iframe src="https://calendar.google.com/calendar/embed?src=drw005526%40gmail.com&ctz=Asia%2FSeoul" style="border: 0" width=100% height=100% frameborder="0" scrolling="no"></iframe>

Keyword
  - Calendar.html 좌측에 위치합니다.
  - keyword는 js/Calendar.js에 keywords array에 저장되어 있습니다.
  - keyword 추가는 addkeyword()함수로 구현되어 있습니다. 페이지에서 직접 추가할 경우 키워드를 입력하고 append를 누르면 추가된 키워드 목록이 왼쪽에 표시됩니다.
  - 삭제는 구현중입니다.

Schedule
  - Calendar.html 우측에 위치합니다.
  - schedule은 js/Calendar.js에 schedules array에 저장됩니다.
  - 추가는 addschedule()함수로 구현되어 있습니다. 페이지에서 직접 추가할 경우 제목, 마감일을 입력하고 append를 누르면 추가된 일정 리스트가 오른쪽에 나옵니다.(캘린더에 바로 연동 x)
  - 삭제는 구현중입니다.


Google Calender 연동
  - 현재 DB에서 데이터 가져와서 보낼수 있는 함수 구현했음, googleCalender.js에 DB형식 있습니다. 
  - google 캘린더 googleCalender.js 처음실행시, credentials.json 필요하고 token.js생성되실 겁니다.  
  - 송영보한테 말하셔서 google api에 gmail등록하셔야 결과 보실수 있습니다. 

학사공지 크롤링
  - 현재 키워드넣고 parsing함수 실행시, 학사공지 페이지에서 공지 10개에 대한 제목, 링크, 날짜, 내용 긁어와서 배열에 저장해두는거 구현완료

아이캠퍼스 크롤링
  - 즐겨찾기 과목정보 크롤링은 완료인데, 과제란에서 예정된 과제 목록불러오기가 어려움....이유를 모르겠음...

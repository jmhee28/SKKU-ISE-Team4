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

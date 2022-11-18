import puppeteer from "puppeteer"

/// import로 바꿔줘야 한다.
import {id,passwd} from './Password.js';

import request_client from 'request-promise-native';


async function crawl() {
  // 가상 브라우져를 실행, headless: false를 주면 벌어지는 일을 새로운 창을 열어 보여준다(default: true)
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  const icampus_id = id; // 추후 로그인 폼에서 각자의 아이디 비밀번호를 입력받게 할 예정
  const icampus_pw = passwd;
  var authorizationToken = null;
  var userID = null;
  let StudentID = null;
  let learning_Array = []
  var thingsToDo = {"lecture":[], "assignment":[]};

  // headless: false일때 브라우져 크기 지정해주는 코드
  // await page.setViewport({
  //     width: 1366,
  //     height: 768
  // });

  //페이지로 이동
  await page.goto('https://icampus.skku.edu/login');
  //

  //해당 페이지에 특정 html 태그를 클릭
  await page.click('#login_wrapper > form > div > div');
  
  //아이디랑 비밀번호 란에 값을 넣기
  await page.evaluate((id, pw) => {
  document.querySelector('#userid').value = id;
  document.querySelector('#password').value = pw;
  }, icampus_id, icampus_pw);

  //로그인 버튼을 클릭
  await page.click('#btnLoginBtn');
  

  //로그인 화면이 전환될 때까지 기다리기, headless: false 일때는 필요 반대로 headless: true일때는 없어야 되는 코드
  await page.waitForNavigation()
  console.log(page.url());
  //로그인 성공시(화면 전환 성공 시)
  if(page.url() === 'https://icampus.skku.edu/'){
      //학사 페이지로 가서       

        await page.goto('https://canvas.skku.edu/');        
        await page.goto('https://canvas.skku.edu/api/v1/users/self/favorites/courses/'); // 즐겨찾기 과목 정보 크롤링  
        
        var extractedText = await page.$eval('*', (el) => el.innerText);        
        extractedText = extractedText.replace('while(1);','');
        //console.log(extractedText);
        const response = JSON.parse(extractedText);
        var course_Array = []
        for(var i=0; i<response.length; i++) {
            if(true){
                var courseData = {
                    "name":response[i].name,
                    "id":response[i].id
                }
                if(userID==null) userID = response[i].enrollments[0].user_id;
                course_Array.push(courseData);
            }
            
        }  
        
        outer: for (var i = 0 ; i < course_Array.length; i++){          
          await page.goto("https://canvas.skku.edu/courses/"+course_Array[i].id+"/external_tools/5"); //아이캠퍼스 인증 토큰을 구하기위한 캐시수집
          const cookies = await page.cookies();
          //console.log(cookies);      
          inner : for(var j = 0; j < cookies.length; j++){
            if (cookies[j]['name'] == 'xn_api_token'){
              authorizationToken = "Bearer " + cookies[j]['value'];
              //console.log(authorizationToken);
              break outer;
            };
          }
          

        }

        let res = await fetch("https://canvas.skku.edu/learningx/api/v1/courses/"+course_Array[0].id+"/total_learnstatus/users/"+userID,{//인증토큰을 통한 학번조회(api url인자로 필요해서)
          method: 'GET',
          headers:{ 'Content-Type': 'application/json',
                    "Authorization": authorizationToken,
                    "Accept": "*/*"}
        });
        let result = await res.json();
        StudentID = result.item.user_login
        //console.log(StudentID)
        

        //console.log('----------------------------------------------------------------------------------------------------------------------------------------');
        for(var i=0; i<course_Array.length; i++) {
          let res = await fetch("https://canvas.skku.edu/learningx/api/v1/courses/"+course_Array[i].id+"/allcomponents_db?user_id="+userID+"&user_login="+StudentID+"&role=1",{//수강과목 정보 크롤링
            method: 'GET',
            headers:{ 'Content-Type': 'application/json',
                      "Authorization": authorizationToken,
                      "Accept": "*/*"}
          });
          let result = await res.json();
          var studyData = {
            "name": course_Array[i].name,
            "course_id": course_Array[i].id,
            "data": result
          }
          learning_Array.push(studyData);          
          //console.log('-----------'+i+'-------'+i+'------------'+i+'----------'+i+'------'+i+'------'+i+'--------'+i+'----------------'+i+'--------'+i+'--------------------'+i+'---------------'+i+'----------------');
        }
        //console.log(learning_Array);

        for(var i=0; i<learning_Array.length; i++){//과목중 출석체크하는 수강해야하는 강의컨텐츠 필터링(과목명,제목,마감기한) 
          for(var j=0; j<learning_Array[i].data.length; j++){                            
                  if(learning_Array[i].data[j].use_attendance && learning_Array[i].data[j].attendance_status != "attendance"){
                      thingsToDo.lecture.push({
                          "course":learning_Array[i].name,
                          "title":learning_Array[i].data[j].title,                          
                          "due":learning_Array[i].data[j].due_at,                                         
                      });
                  }
                  if(learning_Array[i].data[j].type == "assignment" && !(learning_Array[i].data[j].completed)){// 과제 필터링
                      thingsToDo.assignment.push({
                          "course":learning_Array[i].name,
                          "title":learning_Array[i].data[j].title,                          
                          "due":learning_Array[i].data[j].due_at,                                         
                      });
                  }
              }
        }
        console.log(thingsToDo);//json형식에 lecture 리스트, assignment 리스트 있습니다.
      
        
    } else {
      console.error("로그인에 실패하였습니다.");
    }
    await browser.close();
  
};


crawl();  

export {crawl}
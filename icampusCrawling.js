import cheerio from "cheerio"
import puppeteer from "puppeteer"
/// import로 바꿔줘야 한다.
const {id,passwd} = require('./Password.js');

async function crawl(){
  // 가상 브라우져를 실행, headless: false를 주면 벌어지는 일을 새로운 창을 열어 보여준다(default: true)
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const ndhs_id = id; // 추후 로그인 폼에서 각자의 아이디 비밀번호를 입력받게 할 예정
  const ndhs_pw = passwd;

  // headless: false일때 브라우져 크기 지정해주는 코드
  await page.setViewport({
      width: 1366,
      height: 768
  });

  //페이지로 가라
  await page.goto('https://icampus.skku.edu/login');
  //

  //해당 페이지에 특정 html 태그를 클릭해라
  await page.click('#login_wrapper > form > div > div');
  
  //아이디랑 비밀번호 란에 값을 넣어라
  await page.evaluate((id, pw) => {
  document.querySelector('#userid').value = id;
  document.querySelector('#password').value = pw;
  }, ndhs_id, ndhs_pw);

  //로그인 버튼을 클릭해라
  await page.click('#btnLoginBtn');
  //await page.click('');

  //로그인 화면이 전환될 때까지 기다려라, headless: false 일때는 필요 반대로 headless: true일때는 없어야 되는 코드
  await page.waitForNavigation()

  //로그인 실패 시(화면 전환 성공 시)
  if(true/*page.url() === 'http://portal.ndhs.or.kr/dashboard/dashboard'*/){
      //학사 페이지로 가서
      await page.goto('https://canvas.skku.edu/');
      
      
      // 현재 페이지의 html정보를 로드
      const content = await page.content();
      const $ = cheerio.load(content);
      const $courselist = $("#DashboardCard_Container > div> div");
      
      // console.log($courselist);
      let courses = [];

      //const $courselist = $("#nav-tray-portal > span > span > div > div > div > div > div > ul:nth-child(3)").attr("li");
      //console.log($courselist);
      
      //#DashboardCard_Container > div > div:nth-child(1) > div > a


      $courselist.each((idx,node) =>{
        const course = $(node).find("div:nth-child("+(idx+1)+") > div > a").attr("href");
        
        
        courses.push('https://canvas.skku.edu' + course +'/assignments')
        // notices.push({
        //     title:$(node).find(".board-list-content-title > a").text().trim(),
        //     link:$(node).find(".board-list-content-title > a").attr("href"),
        //     date:$(node).find(".board-list-content-info > ul > li:eq(2)").text().trim()
        // })
    });
    console.log(courses);

    for (var hw_link of courses){
      // const res = await page.goto(hw_link)
      // console.log(res)
      if (1){
        await page.goto(hw_link)
        const content2 = await page.content();
        const $ = cheerio.load(content2);

        const $todolist = $('div.assignment-list');
        console.log("------------------------------------------")
        // console.log($todolist);
        console.log("------------------------------------------")
        $todolist.each((idx,node) =>{
            console.log($(node).find("div > div.ig-info > a").text().trim());
            // #assignment_1264126 > div > div.ig-info > a
          // courses.push('https://canvas.skku.edu' + course)
          // notices.push({
          //     title:$(node).find(".board-list-content-title > a").text().trim(),
          //     link:$(node).find(".board-list-content-title > a").attr("href"),
          //     date:$(node).find(".board-list-content-info > ul > li:eq(2)").text().trim()
          // })
          });

      } 
      else {
        console.log("no assigment page")
      }

    }

    
  
  }
  //로그인 실패시
  else{
      console.log('실패');
      ndhs_id = 'nope';
      ndhs_pw = 'nope';
  }

  // //브라우저 꺼라
  // await browser.close();     
};


crawl();  
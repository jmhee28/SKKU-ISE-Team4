import { parsing } from "../crawling.js"
import {authorize, addEvents} from "../googleCalender.js"
let keywords =  ["장학", "취업", "학사"];

async function getCrawled(){
    let crawlresult =  await parsing(keywords[0]);
    return crawlresult;
   }

const m = function (app, fs) {
    let email = "email"
    let skkuid = "skkuid"

    app.get("/", function (req, res) {
        res.render("index")
    });
    app.get("/keywords", function(req, res){
        return res.status(200).json({ keywords: keywords });
    })
    app.get("/calendar", function (req, res) {
        console.log("get calendar");
        authorize().then(addEvents).catch(console.error);
        let crawlresult = [];
        // parsing(keywords[0]).then((a)=>{
        //     crawlresult =  JSON.stringify(a);
        //     console.log("cr: \n" + crawlresult);
        //     res.render("calendar",{ email: email, keywords: keywords,  crawlresult: crawlresult});
        // })
        
        res.render("calendar",{ email: email, keywords: keywords, skkuid: skkuid});
    });

    app.post("/calendar", function (req, res) {
        console.log("post calendar")
        res.render("calendar")
    });

    app.get("/register", function (req, res) {
        console.log("get register")
        res.render("register")
    });
    
    app.post("/login",(req,res) => {  
        email = req.body.googleid  // 구글캘린더 불러올 때 필요   
        keywords = req.body.keywords
        skkuid = req.body.skkuid
        //console.log(req.body)
        res.render("calendar")
    })
}

export { m }
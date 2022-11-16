import { parsing } from "../crawling.js"

const m = function (app, fs) {
    let email = "email"
    let keywords =  ["장학", "취업", "학사"];

    app.get("/", function (req, res) {
        res.render("index")
    });
    app.get("/keywords", function(req, res){
        return res.status(200).json({ keywords: keywords });
    })
    app.get("/calendar", function (req, res) {
        console.log("get calendar");
       
        for(var i=0;i<keywords.length;i++){
            let parse_result = parsing(keywords[i]);
            parse_result.then(response => {
                // content = response
                // console.log(content);
                console.log(response);
            })
            .catch(error => {
                console.log('error')
                console.log(error)
            })
        }
        res.render("calendar",{ email: email, keywords: keywords});
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
        email = req.body.email  // 구글캘린더 불러올 때 필요   
        //console.log(req.body)
        res.render("calendar")
    })
}

export { m }
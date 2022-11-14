module.exports = function (app, fs) {
    let email = "waniboyy"
    app.get("/", function (req, res) {
        res.render("index")
    });

    app.get("/calendar", function (req, res) {
        console.log("get calendar")
        res.render("calendar",{email: email})
    });

    app.post("/calendar", function (req, res) {
        console.log("post calendar")
        res.render("calendar")
    });

    app.get("/register", function (req, res) {
        console.log("post calendar")
        res.render("register")
    });
    
    app.post("/login",(req,res) => {    
        email = req.body.user.email  // 구글캘린더 불러올 때 필요   
        console.log(req.body.user.success)
        if(req.body.user.success)
            res.render("calendar")
    })

}
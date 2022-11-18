import { parsing } from "../crawling.js"
import { authorize, addEvents } from "../googleCalender.js"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, query, where } from "firebase/firestore"
import { crawl } from "../icampusCrawling.js"

const firebaseConfig = {
    apiKey: "AIzaSyAEGuIFzQ6MHzVBiq6Q0IgEypC_GwM4eEA",
    authDomain: "ise-team4.firebaseapp.com",
    projectId: "ise-team4",
    storageBucket: "ise-team4.appspot.com",
    messagingSenderId: "526463390715",
    appId: "1:526463390715:web:8dbf9d0a817049fe89715e",
    measurementId: "G-BT0FWC8KQV"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let keywords = ["장학", "취업", "학사"];
let email = "email"
let skkuid = "skkuid"
async function getkeywords(){
    console.log("get keywords");
    const docsref = collection(db, "accounts");
    const q = query(docsref, where("skkuid", "==", skkuid));
    const querySnapshot = await getDocs(q);
    keywords = querySnapshot.docs[0].data().keywords;
    console.log(keywords);
    return keywords;
  }

const m = function (app, fs) {

    app.get("/", function (req, res) {      
        res.render("index")
    });
    
    /*
    app.post("/", function (req, res) {  
        res.render("index")
    });
    */

    app.get("/keywords",async function (req, res) {
        const docsref = collection(db, "accounts");
        const q = query(docsref, where("skkuid", "==", skkuid));
        const querySnapshot = await getDocs(q);
        keywords = querySnapshot.docs[0].data().keywords;
        return res.status(200).json({ keywords: keywords });
    });

    app.get("/calendar",async function (req, res) {
        console.log("get calendar");
        authorize().then(addEvents).catch(console.error);
        let crawlresult = [];
        const docsref = collection(db, "accounts");
        const q = query(docsref, where("skkuid", "==", skkuid));
        const querySnapshot = await getDocs(q);
        keywords = querySnapshot.docs[0].data().keywords;
        const [courselinks, coursenames] = await crawl()
        res.render("calendar", { email: email, keywords: keywords, skkuid: skkuid, coursenames, coursenames });
    });

    app.post("/calendar", function (req, res) {
        console.log("post calendar")
        res.render("calendar")
    });

    app.get("/register", function (req, res) {
        console.log("get register")
        res.render("register")
    });

    app.post("/login", (req, res) => {
        email = req.body.googleid  // 구글캘린더 불러올 때 필요   
        skkuid = req.body.skkuid
        //console.log(req.body)
        res.render("calendar")
    })
}

export { m, getkeywords }
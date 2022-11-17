
import axios from "axios"
import cheerio from "cheerio"

const getHTML = async (keyword) => {
    try {
        return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=list&srCategoryId1=&srSearchKey=&srSearchVal=" + encodeURI(keyword))
    } catch (err) {
        console.log(err);
    }
}

const getHTML2 = async (keyword) => {
    try {
        return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do" + encodeURI(keyword))
    } catch (err) {
        console.log(err);
    }
}

const contentsParsing = async (keyword) => {
    // console.log("순서: ",i);
    const html = await getHTML2(keyword);
    const $ = cheerio.load(html.data);
    const $noticeContents = $(".pre");

    let contents = []
    $noticeContents.each((idx, n) => {
        
        let str = $(n).text().trim();
        // str = JSON.stringify(str);
        // console.log(str);
        contents.push({
            content: str
        });
    });
    try {
        return await contents;
    } catch (err) {
        console.log(err);
    }

    // console.log( contents );
}

const getContents = async ( noticelist, htmls, $ ) =>{
    let notices=[];
    let idx = 0;
   for (let node of noticelist) {
        let content = await contentsParsing($(node).find(".board-list-content-title > a").attr("href"));
       
        await notices.push({
            idx : idx++,
            title: $(node).find(".board-list-content-title > a").text().trim(),
            link: "https://www.skku.edu/skku/campus/skk_comm/notice01.do" + $(node).find(".board-list-content-title > a").attr("href"),
            date: $(node).find(".board-list-content-info > ul > li:eq(2)").text().trim(),
            content: content
        })
    }
    return notices;
}
const parsing = async (keyword) => {
    // console.log("parsing!!!!!!!!!!!");
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $noticelist = $(".board-list-content-wrap ");
    return await getContents($noticelist, html, $);
    
}

// var keyword_list = ["장학"]

// for (var i = 0; i < keyword_list.length; i++) {
//    console.log( await parsing(keyword_list[i]));
// }


export { parsing }

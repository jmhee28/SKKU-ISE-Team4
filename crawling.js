const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(keyword) => {
    try{
        return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=list&srCategoryId1=&srSearchKey=&srSearchVal="+encodeURI(keyword))
    }catch(err){
        console.log(err);
    }
}

const getHTML2 = async(keyword) => {
    try{
        return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do"+encodeURI(keyword))
    }catch(err){
        console.log(err);
    }
}

const contentsParsing = async(i, list, keyword) => {
    console.log("순서: ",i);
    const html = await getHTML2(keyword);
    const $ = cheerio.load(html.data);
    const $noticeContents = $(".pre");

    let contents =[]
    $noticeContents.each((idx,n) =>{
        console.log(i)
        list[i]["content"] = $(n).text().trim();
    });
    console.log(list);

}


const parsing = async(keyword) => {
    // console.log("parsing!!!!!!!!!!!");
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $noticelist = $(".board-list-content-wrap ");

    let notices = [];
    $noticelist.each((idx,node) =>{
        // contentsParsing($(node).find(".board-list-content-title > a").attr("href"))
        notices.push({
            title:$(node).find(".board-list-content-title > a").text().trim(),
            link:"https://www.skku.edu/skku/campus/skk_comm/notice01.do"+$(node).find(".board-list-content-title > a").attr("href"),
            date:$(node).find(".board-list-content-info > ul > li:eq(2)").text().trim()
        })

        contentsParsing(idx, notices, $(node).find(".board-list-content-title > a").attr("href"))

    });
    
    // console.log(keyword, notices);
}

// var keyword_list = ["장학", "취업", "학사"]
var keyword_list = ["장학"]
for(var i=0;i<keyword_list.length;i++){
    parsing(keyword_list[i]);
}
// parsing("장학")  

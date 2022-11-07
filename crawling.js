const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(keyword) => {
    try{
        return await axios.get("https://www.skku.edu/skku/campus/skk_comm/notice01.do?mode=list&srCategoryId1=&srSearchKey=&srSearchVal="+encodeURI(keyword))
    }catch(err){
        console.log(err);
    }
}

const parsing = async(keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $noticelist = $(".board-list-content-wrap ")

    let notices = [];
    $noticelist.each((idx,node) =>{
        const title = $(node).find(".board-list-content-title > a").text();
        // console.log(title.trim());
        notices.push({
            title:$(node).find(".board-list-content-title > a").text().trim(),
            link:$(node).find(".board-list-content-title > a").attr("href"),
            date:$(node).find(".board-list-content-info > ul > li:eq(2)").text().trim()
        })
    });
    
    console.log(notices);
}

parsing("장학");
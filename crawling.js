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

const parsing = async(keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $noticelist = $(".board-list-content-wrap ")

    let notices = [];
    $noticelist.each((idx,node) =>{
        // const title = $(node).find(".board-list-content-title > a").text();
        // console.log(title.trim());
        // const link = $(node).find(".board-list-content-title > a").attr("href")
        // const html2 = getHTML2(link);
        // const $ = cheerio.load(html2.data)
        // const content = $(pre).text()
        // console.log(content)

        const link = $(node).find(".board-list-content-title > a").attr("href")
        content = getContents(link)
        console.log(content)
        
        notices.push({
            title:$(node).find(".board-list-content-title > a").text().trim(),
            link:"https://www.skku.edu/skku/campus/skk_comm/notice01.do"+$(node).find(".board-list-content-title > a").attr("href"),
            date:$(node).find(".board-list-content-info > ul > li:eq(2)").text().trim()
            // contents: cheerio.load(getHTML("https://www.skku.edu/skku/campus/skk_comm/notice01.do"+$(node).find(".board-list-content-title > a").attr("href")).data)
        })
    });
    
    console.log(notices);
    // console.log(html2);
}

const getContents= async(link) =>{
    const html = await getHTML2(link);
    const $ = cheerio.load(html.data);
    const content = $("ul li")
    return content

}
// const getIcampusHTML = async(keyword) => {
//     try{
//         return await axios.get("https://canvas.skku.edu/"+encodeURI(keyword))
//     }catch(err){
//         console.log(err);
//     }
// }

// const icampusParsing = async(keyword) => {
//     const html = await getIcampusHTML(keyword);
//     const $ = cheerio.load(html.data);
//     const $subjectlist = $(".ic-DashboardCard__box")
//     // console.log(html)
//     let subjects = [];
//     $subjectlist.each((idx,node) =>{
//         const sub = $(node).find(".loginBtn").text();
//         console.log(sub);
//         subjects.push({
//             subject: $(node).find(".ic-DashboardCard__header-title ellipsis").text().trim()
//         })
//     });
    
//     console.log(notices);
// }

// icampusParsing("");
parsing("장학");
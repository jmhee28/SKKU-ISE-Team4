
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
        str = JSON.stringify(str);
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


const parsing = async (keyword) => {
    // console.log("parsing!!!!!!!!!!!");
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $noticelist = $(".board-list-content-wrap ");
    console.log($noticelist.length);
    let notices = [];


    for (let node of $noticelist) {
        let cont = contentsParsing($(node).find(".board-list-content-title > a").attr("href"));
        let content;
        cont.then(response => {
            content = response;
            // console.log(content);
            // console.log(response)
        })
        .catch(error => {
                console.log('error')
                console.log(error)
        }).then(() => {
                // console.log(content);
                notices.push({
                    title: $(node).find(".board-list-content-title > a").text().trim(),
                    link: "https://www.skku.edu/skku/campus/skk_comm/notice01.do" + $(node).find(".board-list-content-title > a").attr("href"),
                    date: $(node).find(".board-list-content-info > ul > li:eq(2)").text().trim(),
                    content: JSON.stringify(content)
                })
                if (notices.length == $noticelist.length) {
                    // console.log(notices);
                    return notices;
                }
        })
    }

}

var keyword_list = ["장학"]

for (var i = 0; i < keyword_list.length; i++) {
    let parse_result = parsing(keyword_list[i]);
    parse_result.then((a) => {
        console.log(a);
      });
    // console.log(JSON.stringify(parse_result));
    // parse_result.then(response => {
    //     // content = response
    //     // console.log(content);
    //     console.log(JSON.stringify(response));
    // })
    // .catch(error => {
    //     console.log('error')
    //     console.log(error)
    // })
}
// parsing("장학")

export { parsing }

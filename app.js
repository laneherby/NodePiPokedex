const fs = require("fs");
const imgurUploader = require("imgur-uploader");
const googleSearchByImageURL = require("./googleSearchByImageURL");


const main = async () => {
    const imgurData = await imgurUploader(fs.readFileSync("bulba.png"), {title: "test"});

    const temp = await googleSearchByImageURL.imageSearch("https://i.imgur.com/wTf2epm.png");    
};

main();
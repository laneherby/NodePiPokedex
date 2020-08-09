const fs = require("fs");
const imgurUploader = require("imgur-uploader");
const googleSearchByImageURL = require("./googleSearchByImageURL");
const say = require('say');

const main = async () => {
    // const imgurData = await imgurUploader(fs.readFileSync("filelocation"), {title: "PokeDex"});

    //const pokemonScanned = await googleSearchByImageURL.imageSearch("imgurData.link");  

    if (pokemonScanned === false) {
        say.speak("Unable to find a powkeimaan");
    } else {
        say.speak(pokemonScanned);
    }
};

main();
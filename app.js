const fs = require("fs");
const imgurUploader = require("imgur-uploader");
const googleSearchByImageURL = require("./googleSearchByImageURL");
const piCamera = require("./PiCamera");
const say = require('say');

const main = async () => {
    const pictureResult = await piCamera.takePicture();

    if (pictureResult === true) {
        try {
            const imgurData = await imgurUploader(fs.readFileSync("./pokeScan.jpg"), {title: "PokeDex"});
            const pokemonScanned = await googleSearchByImageURL.imageSearch(imgurData.link); 

            if (pokemonScanned === false) {
                say.speak("Unable to find a powkeimaan");
            } else {
                say.speak(pokemonScanned);
            }
        } catch (e) {
            console.log(e);
            say.speak("Error while scanning. Check internet connection.");
        }
    } else {
        say.speak(pictureResult);
    }
};

main();
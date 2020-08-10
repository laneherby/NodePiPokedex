const fs = require("fs");
const imgurUploader = require("imgur-uploader");
const googleSearchByImageURL = require("./googleSearchByImageURL");
const piCamera = require("./PiCamera");
const say = require('say');
const button = require("rpi-gpio-buttons")([22]);

const main = async () => {
    say.speak("Scanning for poekeymawn")

    const pictureResult = await piCamera.takePicture();

    if (pictureResult === true) {
        try {
            const imgurData = await imgurUploader(fs.readFileSync("./pokeScan.jpg"), {title: "PokeDex"});
            console.log(imgurData.link);
            const pokemonScanned = await googleSearchByImageURL.imageSearch(imgurData.link); 

            if (pokemonScanned === false) {
                say.speak("Unable to find a poekeymawn", "", 0.9);
                console.log("Unable to find a poekeymawn", "", 0.9);
            } else {
                say.speak("The poekeymawn is a " + pokemonScanned, "", 0.9);
                console.log("That poekeymawn is a " + pokemonScanned, "", 0.9);
            }
        } catch (e) {
            console.log(e);
            say.speak("Error while scanning. Check internet connection.", "", 0.9);
            console.log("Error while scanning. Check internet connection.", "", 0.9);
        }
    } else {
        say.speak(pictureResult, "", 0.9);
        console.log(pictureResult, "", 0.9);
    }
};

console.log("here");

button.on("pressed", (pin) => {   
    main();
});
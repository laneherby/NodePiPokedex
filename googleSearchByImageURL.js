const puppeteer = require("puppeteer");
const pokemon = require("./pokemon.json")
const pronunciations = require('./pronunciations.json');

const isPokemon = (searchValue) => {
    for (pokeObject of pokemon) {
        if(pokeObject.name === searchValue.toLowerCase()) {
            return true;
        }
    }
    return false;
}

const imageSearch = async (imageURL) => {
    const baseURL = "https://images.google.com/searchbyimage?image_url=";

    const browser = await puppeteer.launch({product: "chrome", executablePath:"/usr/bin/chromium"});
    const page = await browser.newPage();
    await page.goto(baseURL+imageURL);
    const searchValues = await page.$eval("input[name=q]", el => el.value);
    const searchArray = searchValues.split(" ");
    await browser.close();

    let pokemonScanned = false;
    for (value of searchArray) {
        if(isPokemon(value)){
            pokemonScanned=pronunciations[value];
        }
    }

    return pokemonScanned;
};

exports.imageSearch = imageSearch;
const request = require('request');
fs = require('fs');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
};

function httpGetSpecies(url) {
    return new Promise((resolve, reject) => {

        var option = {
            url: url,
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            var pokemon = 
            {
                id: json.id,
                names: {},
                generation: json.generation.name,
                genus: {},
                color: json.color.name
            }
            for(pos in json.names) {
                if( json.names[pos].language.name == 'fr' ) {
                    pokemon.names['fr'] = json.names[pos].name;
                }
                if( json.names[pos].language.name == 'en' ) {
                    pokemon.names['en'] = json.names[pos].name;
                }
            }
            for(pos in json.genera) {
                if( json.genera[pos].language.name == 'fr' ) {
                    pokemon.genus['fr'] = json.genera[pos].genus;
                }
                if( json.genera[pos].language.name == 'en' ) {
                    pokemon.genus['en'] = json.genera[pos].genus;
                }
            }
            resolve(pokemon);
        });
    });
}

function httpGetAttrs(url) {
    return new Promise((resolve, reject) => {

        var option = {
            url: url,
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            var types = [];
            for(pos in json.types) {
                types.push(json.types[pos].type.name);
            }
            resolve({
                id: json.id,
                height: json.height,
                types: types,
                name: json.name
            });
        });
    });
}

function httpGetSpecurls() {
    return new Promise((resolve, reject) => {
        var option = {
            url: 'https://pokeapi.co/api/v2/pokemon-species?limit=10000',
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            const list = [];
            for(pos in json.results) {
                list.push({
                    name: json.results[pos].name,
                    url: json.results[pos].url
                })
            }
            resolve(list);
        });
    });
}

function httpGetPokurls() {
    return new Promise((resolve, reject) => {
        var option = {
            url: 'https://pokeapi.co/api/v2/pokemon?limit=10000',
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            const list = [];
            for(pos in json.results) {
                list.push({
                    name: json.results[pos].name,
                    url: json.results[pos].url
                })
            }
            resolve(list);
        });
    });
}

function httpGetGenurls() {
    return new Promise((resolve, reject) => {

        var option = {
            url: 'https://pokeapi.co/api/v2/generation/',
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            const list = [];
            for(pos in json.results) {
                list.push({
                    name: json.results[pos].name,
                    url: json.results[pos].url
                })
            }
            resolve(list);
        });
    });
}

function httpGetRegurls() {
    return new Promise((resolve, reject) => {

        var option = {
            url: 'https://pokeapi.co/api/v2/region/',
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            const list = [];
            for(pos in json.results) {
                list.push({
                    name: json.results[pos].name,
                    url: json.results[pos].url
                })
            }
            resolve(list);
        });
    });
}

function httpGetGeneration(url) {
    return new Promise((resolve, reject) => {
        var option = {
            url: url,
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            var names = {};
            for(pos in json.names) {
                if( json.names[pos].language.name == 'fr' ) {
                    names['fr'] = json.names[pos].name;
                }
                if( json.names[pos].language.name == 'en' ) {
                    names['en'] = json.names[pos].name;
                }
            }
            resolve({
                id: json.id,
                main_region: json.main_region.name,
                name: json.name,
                names: names
            });
        });
    });
}

function httpGetRegion(url) {
    return new Promise((resolve, reject) => {
        var option = {
            url: url,
            method: 'GET'
        }
        request(option, function(error, response, body) {
            var json = JSON.parse(body);
            var names = {};
            for(pos in json.names) {
                if( json.names[pos].language.name == 'fr' ) {
                    names['fr'] = json.names[pos].name;
                }
                if( json.names[pos].language.name == 'en' ) {
                    names['en'] = json.names[pos].name;
                }
            }
            resolve({
                id: json.id,
                main_generation: json.main_generation?.name,
                name: json.name,
                names: names
            });
        });
    });
}

const getPokemonSpecies = async (specList) => {
    return Promise.all(specList.map(spec => httpGetSpecies(spec.url)));
}

const getPokemonAttrs = async (pokList) => {
    return Promise.all(pokList.map(pok => httpGetAttrs(pok.url)));
}

const getGenerations = async (list) => {
    return Promise.all(list.map(generation => httpGetGeneration(generation.url)));
}

const getRegions = async (list) => {
    return Promise.all(list.map(region => httpGetRegion(region.url)));
}

const getPokemons = async (poks, attributes) => {

    const output = [];

    poks.forEach(element => {
        const attribute = attributes[element.id];
        output.push({
            ...element,
            ...attribute
        })
    });

    return Promise.resolve(output);
}

async function main() {

    const specList = await httpGetSpecurls().then(urls => {
        return urls;
    });
    console.log("specList: ", specList.length)

    const pokList = await httpGetPokurls().then(urls => {
        return urls;
    });
    console.log("pokList: ", pokList.length)

    const species = await getPokemonSpecies(specList).then(species => {
        return species;
    });
    console.log("species: ", species.length)

    const poks = await getPokemonAttrs(pokList).then(attrs => {
        return attrs;
    });
    console.log("poks: ", poks.length)

    //console.log(species);
    const attributes = convertArrayToObject(species, "id");
    //console.log(attributes);

    const pokemons = await getPokemons(poks, attributes).then(pokemons => {
        return pokemons;
    });

    console.log("Generating pokemons.json")
    fs.writeFile('src/assets/json/pokemons.json', JSON.stringify(pokemons), function (err) {
        if (err) return console.log(err);
    });

    // GENERATIONS
    const genList = await httpGetGenurls().then(urls => {
        return urls;
    });

    const generations = await getGenerations(genList).then(generations => {
        return convertArrayToObject(generations, "name");
    });

    console.log("Generating generations.json")
    fs.writeFile('src/assets/json/generations.json', JSON.stringify(generations), function (err) {
        if (err) return console.log(err);
    });

    // REGIONS
    const regList = await httpGetRegurls().then(urls => {
        return urls;
    });

    const regions = await getRegions(regList).then(regions => {
        return convertArrayToObject(regions, "name");
    });

    console.log("Generating regions.json")
    fs.writeFile('src/assets/json/regions.json', JSON.stringify(regions), function (err) {
        if (err) return console.log(err);
    });
}

main();
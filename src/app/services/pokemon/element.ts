/*
{
    "id":1,
    "height":7,
    "types":["grass","poison"],
    "name":"bulbasaur",
    "names":{"fr":"Bulbizarre","en":"Bulbasaur"},
    "generation":"generation-i",
    "genus":{"fr":"Pokémon Graine","en":"Seed Pokémon"},
    "color":"green"
}
*/
export interface Pokemon {
    id: number,
    height: number,
    types: Array<string>,
    name: string,
    names: Translation,
    generation: string,
    genus: Translation,
    color: string
}
/*
{
    "id":1,
    "main_generation":"generation-i",
    "name":"kanto",
    "names":{"fr":"Kanto","en":"Kanto"}
}
*/
export interface Generation {
    id: number,
    main_generation: string,
    name: string,
    names: Translation
}

/*
{
    "id":1,
    "main_region":"kanto",
    "name":"generation-i",
    "names":{"fr":"Génération I","en":"Generation I"}
}
*/
export interface Region {
    id: number,
    main_region: string,
    name: string,
    names: Translation
}


export interface Translation {
    fr?: string,
    en?: string
}
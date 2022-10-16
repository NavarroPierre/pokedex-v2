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
    [key: string]: string;
}

export interface Type {
    translation: Translation,
    color?: string
}

export const Types: Map<String, Type> = new Map([
    ['fire',        {translation: {'fr': 'feu', 'en': 'fire'}, color:'#F75231'}] ,
    ['grass',       {translation: {'fr':'plante', 'en':'grass'}, color:'#7BCE52'}],
    ['electric',    {translation: {'fr':'électrique', 'en':'electric'}, color:'#FFC631'}],
    ['water',       {translation: {'fr':'eau', 'en':'water'}, color:'#399CFF'}],
    ['ground',      {translation: {'fr':'sol', 'en':'ground'}, color:'#D6B55A'}],
    ['rock',        {translation: {'fr':'roche', 'en':'rock'}, color:'#BDA55A'}],
    ['fairy',       {translation: {'fr':'fée', 'en':'fairy'}, color:'#E09AE3'}],
    ['poison',      {translation: {'fr':'poison', 'en':'poison'}, color:'#B55AA5'}],
    ['bug',         {translation: {'fr':'insecte', 'en':'bug'}, color:'#ADBD21'}],
    ['dragon',      {translation: {'fr':'dragon', 'en':'dragon'}, color:'#8858F6'}],
    ['psychic',     {translation: {'fr':'psy', 'en':'psychic'}, color:'#FA749C'}],
    ['flying',      {translation: {'fr':'vol', 'en':'flying'}, color:'#9CADF7'}],
    ['fighting',    {translation: {'fr':'combat', 'en':'fighting'}, color:'#A55239'}],
    ['normal',      {translation: {'fr':'normal', 'en':'normal'}, color:'#ADA594'}],
    ['dark',        {translation: {'fr':'ténèbre', 'en':'dark'}, color:'#735A4A'}],
    ['ice',         {translation: {'fr':'glace', 'en':'ice'}, color:'#98D8D8'}],
    ['ghost',       {translation: {'fr':'spectre', 'en':'ghost'}, color:'#6363B5'}],
    ['steel',       {translation: {'fr':'acier', 'en':'steel'}, color:'#ADADC6'}],
]);
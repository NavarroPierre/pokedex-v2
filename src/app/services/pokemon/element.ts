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

export interface Type {
    translation: Translation,
    color?: string
}

export const Types: Map<String, Type> = new Map([
    ['fire',        {translation: {'fr': 'feu', 'en': 'fire'}, color:'#F39B5A'}] ,
    ['grass',       {translation: {'fr':'plante', 'en':'grass'}, color:'#78C850'}],
    ['electric',    {translation: {'fr':'électrique', 'en':'electric'}, color:'#FADB5F'}],
    ['water',       {translation: {'fr':'eau', 'en':'water'}, color:'#8EC8F3'}],
    ['ground',      {translation: {'fr':'sol', 'en':'ground'}, color:'#E0C068'}],
    ['rock',        {translation: {'fr':'roche', 'en':'rock'}, color:'#B8A038'}],
    ['fairy',       {translation: {'fr':'fée', 'en':'fairy'}, color:'#EE99AC'}],
    ['poison',      {translation: {'fr':'poison', 'en':'poison'}, color:'#CD81CD'}],
    ['bug',         {translation: {'fr':'insecte', 'en':'bug'}, color:'#A8B820'}],
    ['dragon',      {translation: {'fr':'dragon', 'en':'dragon'}, color:'#9A72FA'}],
    ['psychic',     {translation: {'fr':'psy', 'en':'psychic'}, color:'#FA749C'}],
    ['flying',      {translation: {'fr':'vol', 'en':'flying'}, color:'#D3C7F7'}],
    ['fighting',    {translation: {'fr':'combat', 'en':'fighting'}, color:'#D95048'}],
    ['normal',      {translation: {'fr':'normal', 'en':'normal'}, color:'#A8A878'}],
    ['dark',        {translation: {'fr':'ténèbre', 'en':'dark'}, color:'#808B96'}],
    ['ice',         {translation: {'fr':'glace', 'en':'ice'}, color:'#98D8D8'}],
    ['ghost',       {translation: {'fr':'spectre', 'en':'ghost'}, color:'#705898'}],
    ['steel',       {translation: {'fr':'acier', 'en':'steel'}, color:'#B8B8D0'}],
]);
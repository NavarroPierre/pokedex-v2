import { Component, OnInit } from '@angular/core';
import { Pokemon, Types } from 'src/app/services/pokemon/element';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  pokemons: Array<Pokemon> = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    })
  }

  getName(pokemon: Pokemon) {
    return pokemon.name;
  }

  getTypes(pokemon: Pokemon) {
    return pokemon.types.join('/');
  }

  getBackgroundColor(pokemon: Pokemon) {
    if (pokemon.types.length === 1) {
      return {'backgroundColor': Types.get(pokemon.types[0])?.color };
    } else {
      return {'background-image': `linear-gradient(${Types.get(pokemon.types[0])?.color}, ${Types.get(pokemon.types[1])?.color})` };
    }
  }
}

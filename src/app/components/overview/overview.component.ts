import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon, Types } from 'src/app/services/pokemon/element';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private settingsService: SettingsService) { }

  pokemons: Array<Pokemon> = [];

  filterValues: Array<Pokemon> = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filterValues = Array.from(this.pokemons);
    })
  }

  @Input() set filterName(value: string) {
    this.filterValues = this.pokemons
      .filter(pokemon => {return value === "" || this.getName(pokemon).toLowerCase().includes(value.toLowerCase())
    });
  }

  @Input() set darkmode(value: string) {
    console.log(value);
  }

  getName(pokemon: Pokemon): string {
    return pokemon.names[this.settingsService.lang()] || pokemon.name;
  }

  getTypes(pokemon: Pokemon) {

    let types: Array<string> = [];

    pokemon.types.forEach(type => {
      types.push(Types.get(type)?.translation[this.settingsService.lang()] || type);
    })

    return types.join('/');
  }

  getBackgroundColor(pokemon: Pokemon) {
    if (pokemon.types.length === 1) {
      return {'backgroundColor': Types.get(pokemon.types[0])?.color };
    } else {
      return {'background-image': `linear-gradient(110deg, ${Types.get(pokemon.types[0])?.color}, ${Types.get(pokemon.types[1])?.color})` };
    }
  }
}

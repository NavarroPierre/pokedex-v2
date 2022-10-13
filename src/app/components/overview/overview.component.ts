import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      pokemons.forEach(pokemon => {
        console.log(pokemon);
      });
    })
  }
}

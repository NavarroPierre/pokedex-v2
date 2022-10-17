import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon, Types } from 'src/app/services/pokemon/element';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  pokemons: Array<Pokemon> = [];

  filterValues: Array<Pokemon> = [];
  
  panelOpenState = true;
  removable = true;
  addOnBlur = false;
  selectable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('autocompleteType') matAutocompleteType!: MatAutocomplete;
  @ViewChild('autocompleteGeneration') matAutocompleteGen!: MatAutocomplete;

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('genInput') genInput!: ElementRef<HTMLInputElement>;

  filteredTypes: Observable<string[]>;
  filteredGens: Observable<string[]>;

  typeCtrl = new FormControl();
  selectedTypes: string[] = [];
  allTypes: string[] = [];

  genCtrl = new FormControl();
  selectedGens: string[] = [];
  allGens: string[] = [];

  constructor(private pokemonService: PokemonService, private settingsService: SettingsService) { 
    this.allTypes = this.pokemonService.getTypes();
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filterType(type) : this.allTypes.slice()));

    this.filteredGens = this.genCtrl.valueChanges.pipe(
        startWith(null),
        map((generation: string | null) => generation ? this._filterGen(generation) : this.allGens.slice()));

    this.pokemonService.getGenerations().subscribe(generations => {
      this.allGens = [];
      generations.forEach(generation => {
        this.allGens.push(generation.name);
//        this.allGens.push(generation.names[this.settingsService.lang()]);
      });
    });
  }
  
  ngOnInit(): void {
    this.refresh();

    this.filteredTypes.subscribe(types => {
      console.log(this.selectedTypes);
    })
    this.filteredGens.subscribe(types => {
      console.log(this.selectedGens);
    })
  }

  isVisible(pokemon: Pokemon): boolean {
    let _isVisible: boolean;
    if( this.selectedTypes.length === 0 && this.selectedGens.length === 0 ) {
     return true;
    } else {
      if( this.selectedTypes.length > 0 ) {
        _isVisible = false;
        this.selectedTypes.forEach(type => {
          if( pokemon.types.indexOf(type.toLowerCase()) !== -1 ) {
            _isVisible = true;
          }
        });
        if( _isVisible === false ) {
          return false;
        }
      } 
      if( this.selectedGens.length > 0 ) {
        _isVisible = false;
        this.selectedGens.forEach(gen => {
          if( pokemon.generation.toLowerCase() === gen.toLowerCase() ) {
            _isVisible = true;
          }
        });
        if( _isVisible === false ) {
          return false;
        }
      }
    }

    return true;
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

  addType(event: MatChipInputEvent): void {
    if( event.value === "" ) {
      return;
    }
    console.log('Add ', event.value);
    const value = event.value;
    const input = event.input;

    if (!this.matAutocompleteType.isOpen) {
      if ((value || '').trim()) {
        this.selectedTypes.push(value.trim());
      } 
    } else if (this.allTypes.indexOf(value.trim()) !== -1 ) {
      this.selectedTypes.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.typeCtrl.setValue(null);
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    console.log('Select ', event.option.viewValue);
    if( this.selectedTypes.indexOf(event.option.viewValue) === -1 ) {
      this.selectedTypes.push(event.option.viewValue);
      this.typeInput.nativeElement.value = '';
      this.typeCtrl.setValue(null);
    } else {
      this.typeInput.nativeElement.value = '';
      this.typeCtrl.setValue(null);
    }
  }

  removeType(type: string): void {
    console.log('Remove ', type);
    const index = this.selectedTypes.indexOf(type);

    if (index >= 0) {
      this.selectedTypes.splice(index, 1);
    }
    this.typeInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);
  }

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().indexOf(filterValue) === 0);
  }

  addGen(event: MatChipInputEvent): void {
    if (!this.matAutocompleteType.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.selectedGens.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.genCtrl.setValue(null);
    }
  }

  selectedGen(event: MatAutocompleteSelectedEvent): void {
    if( this.selectedGens.indexOf(event.option.viewValue) === -1 ) {
      this.selectedGens.push(event.option.viewValue);
      this.genInput.nativeElement.value = '';
      this.genCtrl.setValue(null);
    } else {
      this.genInput.nativeElement.value = '';
      this.genCtrl.setValue(null);
    }
  }

  removeGen(generation: string): void {
    const index = this.selectedGens.indexOf(generation);

    if (index >= 0) {
      this.selectedGens.splice(index, 1);
    }
  }

  private _filterGen(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGens.filter(generation => generation.toLowerCase().indexOf(filterValue) === 0);
  }
}

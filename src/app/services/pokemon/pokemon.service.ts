import { Injectable } from '@angular/core';
import { Observable, of }     from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';

import { Generation, Pokemon, Region } from './element';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: Map<number, Pokemon>;
  regions: Map<number, Region>;
  generations: Map<number, Generation>;

  maxId: number = 898;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.pokemons = new Map();
    this.regions = new Map();
    this.generations = new Map();
  }

  getPokemons(): Observable<Pokemon[]> {
    if( this.pokemons.size !== 0 ) {
      console.log("Use pokemons cache!");
      return of(Array.from(this.pokemons.values()).sort((n1,n2) => {
        if (n1.id > n2.id) {
            return 1;
        }
    
        if (n1.id < n2.id) {
            return -1;
        }
    
        return 0;
      }));
    }
    return this.http.get<Pokemon[]>("/assets/json/pokemons.json")
      .pipe(
          map(res => {
          res.forEach(item => {
            this.pokemons.set(item.id, <Pokemon>{
                  ...item
              });
          });
          return Array.from(this.pokemons.values()).filter((item) => (item.id <= this.maxId)).sort((n1,n2) => {
            if (n1.id > n2.id) {
                return 1;
            }
        
            if (n1.id < n2.id) {
                return -1;
            }
        
            return 0;
          });
        })
      )
      .pipe(
          catchError(this.handleError<Pokemon[]>('Get pokemons', []))
      );
  }

  getRegions(): Observable<Region[]> {
    if( this.regions.size !== 0 ) {
      console.log("Use regions cache!");
      return of(Array.from(this.regions.values()).sort((n1,n2) => {
        if (n1.id > n2.id) {
            return 1;
        }
    
        if (n1.id < n2.id) {
            return -1;
        }
    
        return 0;
      }));
    }
    return this.http.get<Region[]>("/assets/json/regions.json")
    .pipe(
        map(res => {
        res.forEach(item => {
          this.regions.set(item.id, <Region>{
                ...item
            });
        });
        return Array.from(this.regions.values()).sort((n1,n2) => {
          if (n1.id > n2.id) {
              return 1;
          }
      
          if (n1.id < n2.id) {
              return -1;
          }
      
          return 0;
        });
      })
    )
    .pipe(
        catchError(this.handleError<Region[]>('Get regions', []))
    );
  }

  getGenerations(): Observable<Generation[]> {
    if( this.generations.size !== 0 ) {
      console.log("Use generations cache!");
      return of(Array.from(this.generations.values()).sort((n1,n2) => {
        if (n1.id > n2.id) {
            return 1;
        }
    
        if (n1.id < n2.id) {
            return -1;
        }
    
        return 0;
      }));
    }
    return this.http.get<Generation[]>("/assets/json/generations.json")
    .pipe(
        map(res => {
        res.forEach(item => {
          this.generations.set(item.id, <Generation>{
                ...item
            });
        });
        return Array.from(this.generations.values()).sort((n1,n2) => {
          if (n1.id > n2.id) {
              return 1;
          }
      
          if (n1.id < n2.id) {
              return -1;
          }
      
          return 0;
        });
      })
    )
    .pipe(
        catchError(this.handleError<Generation[]>('Get generations', []))
    );
  }

  private handleError<T>(operation = 'unknown', result?: T) {
    return (error: any): Observable<T> => {
  
      this.toastr.error(operation, error.message, {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

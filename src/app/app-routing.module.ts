import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {path: 'pokedex', component: OverviewComponent},
  {path: '',   redirectTo: '/pokedex', pathMatch: 'full' },
  {path: '**'  , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

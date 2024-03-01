import { Routes } from '@angular/router';
import { CreateEditHeroeComponent } from './pages/create-edit-heroe/create-edit-heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


export const routes: Routes = [
    { path: '', title: 'Heroes', component: HeroesComponent, pathMatch: 'full' },
    { path: 'heroe', title: 'Heroes', component: CreateEditHeroeComponent }
];
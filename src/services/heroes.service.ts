import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../app/types/heroes';
import { her } from './heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public heroes = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroes.asObservable();
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  heroesList: Hero[] = [];
  constructor(private http: HttpClient) {

  }

  getHeroesFromLocalStorage(): void {
    let storedHeroesList = localStorage.getItem('heroesList');
    if (storedHeroesList && storedHeroesList !== 'undefined') {
      this.heroesList = JSON.parse(storedHeroesList);
    }
    const listToUpdate = this.heroesList.length > 0 ? this.heroesList : her;
    this.updateHeroesList(listToUpdate);
  }


  updateHeroesList(heroes: Hero[]): void {
    this.heroes.next(heroes);
    localStorage.setItem('heroesList', JSON.stringify(heroes));
  }

  editHero(heroeToModify: Hero) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.map(hero => hero.id === heroeToModify.id ? heroeToModify : hero);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  deleteHero(heroId: string | undefined) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.filter(hero => hero.id !== heroId);
    this.updateAndStoreHeroes(updatedHeroes);
  }


  createHero(newHeroe: Hero) {
    this.heroesList = this.getStoredHeroesList();
    const newHeroeWithId = { ...newHeroe, id: (Math.floor(Math.random() * 1000) + 1).toString() };
    const updatedHeroes = [...this.heroesList, newHeroeWithId];
    this.updateAndStoreHeroes(updatedHeroes);
  }

  getStoredHeroesList(): Hero[] {
    const storedHeroesList = localStorage.getItem('heroesList');
    return storedHeroesList ? JSON.parse(storedHeroesList) : [];
  }

  updateAndStoreHeroes(heroes: Hero[]): void {
    this.heroesList = heroes;
    this.updateHeroesList(heroes);
  }

  findHeroById(id: string) {
    const selectedHero = this.heroesList.find((hero: { id: string; }) => hero.id === id);
    return selectedHero;
  }


}

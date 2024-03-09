import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Hero } from '../models/heroes.inteface';
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  firestore: Firestore = inject(Firestore);
  public heroes = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroes.asObservable();
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  heroesList: Hero[] = [];
  
  constructor() {

  }

  getHeroes(): void {
    const itemCollection = collection(this.firestore, 'heroes');
    collectionData(itemCollection).pipe(
      map((heroes: any[]) => heroes.map(hero => hero as Hero))
    ).subscribe(heroesArray => {
      this.heroes.next(heroesArray);
    })
  }


  async editHero(heroToModify: Hero) {
    const itemCollection = collection(this.firestore, 'heroes');
    await setDoc(doc(itemCollection, heroToModify.id),
      heroToModify
    );
  }

  async deleteHero(heroId: string | undefined) {
    const itemCollection = collection(this.firestore, 'heroes');
    await deleteDoc(doc(itemCollection, heroId));
  }


  async createHero(newHero: Hero) {
    const newId = (Math.floor(Math.random() * 1000) + 1).toString();
    newHero.id = newId;
    const itemCollection = collection(this.firestore, 'heroes');
    await setDoc(doc(itemCollection, newId),
      newHero
    );
  }

  async findHeroById(id: string) {
    const itemCollection = collection(this.firestore, 'heroes');
    const docRef = doc(itemCollection, id);
    const docSnap = await getDoc(docRef);
    const hero: Hero = docSnap.data() as Hero;
    return hero;
  }

}

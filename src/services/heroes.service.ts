import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Hero } from '../app/types/heroes';
import { Firestore, collection, collectionData, getDoc } from '@angular/fire/firestore';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  item$!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  public heroes = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroes.asObservable();
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  heroesList: Hero[] = [];
  constructor(private http: HttpClient) {

  }

  getHeroes(): void {
    const itemCollection = collection(this.firestore, 'heroes');
    collectionData(itemCollection).pipe(
      map((heroes: any[]) => heroes.map(hero => hero as Hero))
    ).subscribe(heroesArray => {
      this.heroes.next(heroesArray);
    })
  }


  // getHeroesFromLocalStorage(): void {
  //let storedHeroesList = localStorage.getItem('heroesList');
  //if (storedHeroesList && storedHeroesList !== 'undefined') {
  //this.heroesList = JSON.parse(storedHeroesList);
  //}
  //const listToUpdate = this.heroesList.length > 0 ? this.heroesList : her;
  //this.updateHeroesList(listToUpdate);
  //}


  //  updateHeroesList(heroes: Hero[]): void {
  //this.heroes.next(heroes);
  //localStorage.setItem('heroesList', JSON.stringify(heroes));
  //}

  async editHero(heroToModify: Hero) {
    //    this.heroesList = this.getStoredHeroesList();
    //const updatedHeroes = this.heroesList.map(hero => hero.id === heroeToModify.id ? heroeToModify : hero);
    //this.updateAndStoreHeroes(updatedHeroes);
    const itemCollection = collection(this.firestore, 'heroes');
    await setDoc(doc(itemCollection, heroToModify.id),
      heroToModify
    );
  }

  async deleteHero(heroId: string | undefined) {
    //   this.heroesList = this.getStoredHeroesList();
    //const updatedHeroes = this.heroesList.filter(hero => hero.id !== heroId);
    //this.updateAndStoreHeroes(updatedHeroes);
    const itemCollection = collection(this.firestore, 'heroes');
    await deleteDoc(doc(itemCollection, heroId));
  }


  async createHero(newHero: Hero) {
    //  this.heroesList = this.getStoredHeroesList();
    // const newHeroeWithId = { ...newHeroe, id: (Math.floor(Math.random() * 1000) + 1).toString() };
    //const updatedHeroes = [...this.heroesList, newHeroeWithId];
    //this.updateAndStoreHeroes(updatedHeroes);
    const newId = (Math.floor(Math.random() * 1000) + 1).toString();
    newHero.id = newId;
    const itemCollection = collection(this.firestore, 'heroes');
    await setDoc(doc(itemCollection, newId),
      newHero
    );
  }

  //getStoredHeroesList(): Hero[] {
    //const storedHeroesList = localStorage.getItem('heroesList');
    //return storedHeroesList ? JSON.parse(storedHeroesList) : [];
  //}

  //updateAndStoreHeroes(heroes: Hero[]): void {
    //this.heroesList = heroes;
    //this.updateHeroesList(heroes);
  //}

  async findHeroById(id: string) {
    const itemCollection = collection(this.firestore, 'heroes');
    const docRef = doc(itemCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(typeof (docSnap.data()));
    } else {
      console.log("No such document!");
    }
    const hero: Hero = docSnap.data() as Hero;
    return hero;
  }


  //  findHeroById_(id: string): Promise<any> {
  //const itemCollection = collection(this.firestore, 'heroes');
  //const docRef = doc(itemCollection, id);

  //return new Promise((resolve, reject) => {
  //getDoc(docRef).then((docSnap) => {
  //if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());
  //resolve(docSnap.data());
  //} else {
  //console.log("No such document!");
  //reject("No such document!");
  //}
  //}).catch((error) => {
  //console.error("Error getting document:", error);
  //reject(error);
  //});
  //});
  //}


}

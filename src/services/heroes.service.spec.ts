
import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { Hero } from '../app/types/heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let firestoreStub: any;

  beforeEach(() => {
    firestoreStub = {
    collection: jasmine.createSpy().and.returnValue({
    doc: jasmine.createSpy().and.returnValue({
    set: jasmine.createSpy().and.returnValue(Promise.resolve()),
    delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
    }),
    valueChanges: jasmine.createSpy().and.returnValue(of([{ id: '1', name: 'Hero One', alias: '', power: '', image: '' }])),
    }),
    };

   // firestoreStub = jasmine.createSpyObj('Firestore', ['collection']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HeroesService,
        { provide: Firestore, useValue: firestoreStub },
        importProvidersFrom([
          provideFirebaseApp(() => initializeApp(
            {
              apiKey: "AIzaSyAM9aTo0K0p3bqhBgPrvsJvuFPPdLRWWcg",
              authDomain: "heroes-4dc58.firebaseapp.com",
              projectId: "heroes-4dc58",
              storageBucket: "heroes-4dc58.appspot.com",
              messagingSenderId: "607787966902",
              appId: "1:607787966902:web:fdfce8e304250c7ee76117"
            }
          )),
          provideFirestore(() => getFirestore()),
        ]),
      ],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('getHeroes should return an observable with heroes', (done: DoneFn) => {
  //service.getHeroes();
  //service.heroes$.subscribe((heroes) => {
  //expect(heroes).toBeDefined;
  //done();
  //});
  //});


  // it('getHeroes should return an observable with heroes', (done: DoneFn) => {
  //const mockHeroes: Hero[] = [{ id: '1', name: 'Hero 1', alias: 'hero', power: '', image: '' }];
  //service.getHeroes();
  //service.heroes$ = of(mockHeroes);
  //expect(service.heroes).toBeDefined;
  //});



  // it('createHero should add a hero', async () => {
  //const hero: Hero = { id: '2', name: 'Hero Two', alias: '', power: '', image: '' };
  //await service.createHero(hero);
  //expect(firestoreStub.collection().doc().set).toHaveBeenCalled();
  //});


  //it('should get heroes', () => {
  //const heroesArray = [{ id: '1', name: 'Hero 1' , alias:'', power: '', image: ''}];
  //const collectionDataSpy = jasmine.createSpy().and.returnValue({ pipe: () => ({ subscribe: (callback: any) => callback(heroesArray) }) });
  //firestoreStub.collection.and.returnValue({ collectionData: collectionDataSpy });
  //service.getHeroes();
  //service.heroes$.subscribe(heroes => {
  //console.log('hhh', heroes);
  //expect(heroes).toBeDefined;
  //});
  //flush(); 
  //});


  // it('should get heroes', fakeAsync(() => {
  //const heroesArray = [{ id: '1', name: 'Hero 1' }];
  //const collectionDataSpy = jasmine.createSpy().and.returnValue({ pipe: () => ({ subscribe: (callback: any) => callback(heroesArray) }) });
  //firestoreStub.collection.and.returnValue({ collectionData: collectionDataSpy });
  //service.getHeroes();
  //service.heroes$.subscribe(heroes => {
  //expect(heroes).toBeDefined;
  //});
  //flush();
  //}));

  it('should get heroes', fakeAsync(() => {
    const heroesArray = [{ id: '1', name: 'Hero 1' }, { id: '2', name: 'Hero 2' }];
    const collectionDataSpy = jasmine.createSpy().and.returnValue({ pipe: () => ({ subscribe: (callback: any) => callback(heroesArray) }) });
    firestoreStub.collection.and.returnValue({ collectionData: collectionDataSpy });
    service.getHeroes();
    tick();
    service.heroes$.subscribe(heroes => {
      expect(heroes).toBeDefined;
    });
  }));


 // it('should edit hero', fakeAsync(() => {
    //const heroToModify = { id: '1', name: 'Modified Hero', alias: '', image: '', power: '' };
    //const setDocSpy = jasmine.createSpy().and.returnValue(Promise.resolve());
    //firestoreStub.collection.and.returnValue({ setDoc: setDocSpy });
    //service.editHero(heroToModify);
    //tick(); // Espera a que se completen las tareas asincrónicas
    //expect(setDocSpy).toHaveBeenCalled();
  //}));
  
  

  // it('should edit hero', async () => {
  //const heroToModify = { id: '1', name: 'Modified Hero' };
  //const setDocSpy = jasmine.createSpy().and.returnValue(Promise.resolve());
  //firestoreMock.collection.and.returnValue({ setDoc: setDocSpy });
  //await service.editHero(heroToModify);
  //expect(setDocSpy).toHaveBeenCalledWith(jasmine.any(Object), heroToModify);
  //});



  // it('editHero should modify a hero', async () => {
  //var spy = jasmine.createSpy(firestoreStub.collection().doc().set);
  //await service.editHero({ id: '1', name: 'Modified Hero One', alias: '', power: '', image: '' });
  //expect(spy).toHaveBeenCalled();
  //// expect(firestoreStub.collection().doc().set).toHaveBeenCalled();
  //});

  //it('deleteHero should remove a hero', async () => {
  //await service.deleteHero('1');
  ////expect(firestoreStub.collection().doc().delete).toHaveBeenCalled();
  //});


});


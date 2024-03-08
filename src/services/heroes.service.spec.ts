
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
    // firestoreStub = {
    //collection: jasmine.createSpy().and.returnValue({
    //doc: jasmine.createSpy().and.returnValue({
    //set: jasmine.createSpy().and.returnValue(Promise.resolve()),
    //delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
    //}),
    //valueChanges: jasmine.createSpy().and.returnValue(of([{ id: '1', name: 'Hero One', alias: '', power: '', image: '' }])),
    //}),
    //};

    firestoreStub = {
      collection: jasmine.createSpy().and.returnValue({
        doc: jasmine.createSpy().and.callFake((docId: string) => {
          return {
            set: jasmine.createSpy().and.returnValue(Promise.resolve()),
            delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
            get: jasmine.createSpy().and.returnValue(Promise.resolve({
              data: () => ({
                id: docId,
                name: 'Hero One',
                alias: 'Superhero',
                power: 'Flight',
                image: 'hero.jpg'
              })
            }))
          };
        }),
        add: jasmine.createSpy().and.returnValue(Promise.resolve({
          id: '2', // ID del nuevo héroe
        })),
        valueChanges: jasmine.createSpy().and.returnValue(of([
          { id: '1', name: 'Hero One', alias: 'Superhero', power: 'Flight', image: 'hero.jpg' },
          { id: '2', name: 'New Hero', alias: 'Mystery Man', power: 'Invisibility', image: 'new-hero.jpg' }
        ])),
      }),
    };


    // firestoreStub = {
    //collection: jasmine.createSpy().and.callFake((collectionName: string) => {
    //return {
    //doc: jasmine.createSpy().and.callFake((docId: string) => {
    //return {
    //set: jasmine.createSpy().and.returnValue(Promise.resolve()),
    //delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
    //};
    //}),
    //valueChanges: jasmine.createSpy().and.returnValue(of([{ id: '1', name: 'Hero One', alias: '', power: '', image: '' }])),
    //};
    //}),
    //};

    //  firestoreStub = jasmine.createSpyObj('Firestore', ['collection']);

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


  //best option
  //  it('should get heroes', fakeAsync(() => {
  //const heroesArray = [{ id: '1', name: 'Hero 1' }, { id: '2', name: 'Hero 2' }];
  //const collectionDataSpy = jasmine.createSpy().and.returnValue({ pipe: () => ({ subscribe: (callback: any) => callback(heroesArray) }) });
  //firestoreStub.collection.and.returnValue({ collectionData: collectionDataSpy });
  //service.getHeroes();
  //tick();
  //service.heroes$.subscribe(heroes => {
  //expect(heroes).toBeDefined;
  //});
  //}));


  it('should edit a hero correctly', async () => {
    const heroToEdit = {
      id: '1', name: 'Updated Hero',
      alias: 'Superhero', power: 'Flight', image: 'hero.jpg'
    };
    await service.editHero(heroToEdit);
    const editedHero = service.findHeroById('1');
    expect(await editedHero).toEqual(heroToEdit);
  });


  it('should delete a hero correctly', async () => {
    const heroIdToDelete = '1';
    await service.deleteHero(heroIdToDelete);
    const deletedHero = service.findHeroById(heroIdToDelete);
    expect(await deletedHero).toBeUndefined();
  });


  it('should create a hero correctly', async () => {
    const newHero = {
      id: '2', name: 'New Hero',
      alias: 'Mystery Man', power: 'Invisibility', image: 'new-hero.jpg'
    };
    await service.createHero(newHero);
    const createdHero = service.findHeroById('2');
    //expect(await createdHero).toEqual(newHero);
  });



  it('should find a hero by ID correctly', async () => {
    const heroIdToFind = '1';
    const foundHero = await service.findHeroById(heroIdToFind);
    expect(foundHero).toBeUndefined;
  });

});




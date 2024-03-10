
import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';

describe('HeroesService', () => {
  let service: HeroesService;
  let firestoreStub: any;

  beforeEach(() => {
    firestoreStub = jasmine.createSpyObj('Firestore', ['collection']);
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

  it('should get heroes', async () => {
    service.getHeroes();
    service.heroes$.subscribe(heroes => {
      expect(heroes).toBeDefined;
    });
  });

  it('should create and find a hero correctly', async () => {
    const newHero = {
      id: '1', name: 'New Hero ONE',
      alias: 'Mystery Man', power: 'Invisibility', image: 'https://i.ibb.co/8Mf4NXg/Screenshot-11.png'
    };
    await service.createHero(newHero);
    const createdHero = service.findHeroById('1');
    expect(await createdHero).toBeDefined;
  });


  it('should edit a hero correctly', async () => {
    const heroToEdit = {
      id: '1', name: 'Updated Hero',
      alias: 'Superhero', power: 'Flight', image: 'https://i.ibb.co/8Mf4NXg/Screenshot-11.png'
    };
    await service.editHero(heroToEdit);
    const editedHero = service.findHeroById('1');
    expect(await editedHero).toEqual(heroToEdit);
  });


  it("should delete a new hero created correctly and then it can't be found", async () => {
    const newHeroToDelete = {
      id: '27', name: 'New Hero to Delete',
      alias: 'Batman', power: 'Strong', image: 'https://i.ibb.co/8Mf4NXg/Screenshot-11.png'
    };
    await service.createHero(newHeroToDelete);
    const heroIdToDelete = '27';
    await service.deleteHero(heroIdToDelete);
    const deletedHero = service.findHeroById(heroIdToDelete);
    expect(await deletedHero).toBeUndefined();
  });


  it("should delete a hero incorrectly because this id don't exist", async () => {
    const heroIdToDelete = '33';
    await service.deleteHero(heroIdToDelete);
    const deletedHero = service.findHeroById(heroIdToDelete);
    expect(await deletedHero).toBeUndefined();
  });

});




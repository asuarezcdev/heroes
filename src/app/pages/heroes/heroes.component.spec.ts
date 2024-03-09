import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeroesService } from '../../../core/services/heroes.service';
import { of } from 'rxjs';
import { Hero } from '../../../core/models/heroes.inteface';
import * as AngularFireFirestore from '@angular/fire/firestore';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Firestore, collection, collectionData, getDoc, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let router: Router;
  let dialog: MatDialog;
  let heroesService: HeroesService;
  let firestoreStub: any;

  firestoreStub = {
    collection: jasmine.createSpy().and.returnValue({
      doc: jasmine.createSpy().and.returnValue({
        set: jasmine.createSpy().and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
      }),
      valueChanges: jasmine.createSpy().and.returnValue(of([{ id: '1', name: 'Hero One', alias: '', power: '', image: '' }])),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesComponent, RouterTestingModule, BrowserAnimationsModule, FirebaseAppModule],
      providers: [Router, HeroesService,
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
        ])
      ]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    heroesService = TestBed.inject(HeroesService);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load data on ngOnInit', () => {
    spyOn(component, 'loadData');
    component.ngOnInit();
    expect(component.loadData).toHaveBeenCalled();
  });


  it('should load data and set isLoading to false after 1 second', async() => {
    const mockHeroes: Hero[] = [{ id: '1', name: 'Hero 1', alias: 'hero', power: '', image: '' }];
    heroesService.heroes$ = of(mockHeroes);
    expect(component.isLoading).toBeTrue();
    component.loadData();
    expect(component.heroes).toBeDefined;
  });


  it('should create or edit hero', () => {
    component.createOrEditHero(true);
    expect(router.navigate).toHaveBeenCalledWith(['/heroe', { type: 'create' }]);
    component.createOrEditHero(false, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/heroe', { type: 'edit', id: '1' }]);
  });





  it('should delete hero', () => {
    const heroeId = '1';
    const matDialogRef = {
      componentInstance: {
        confirmDelete: {
          subscribe: (callback: any) => callback(true)
        }
      }
    } as MatDialogRef<any>;
    spyOn(matDialogRef.componentInstance.confirmDelete, 'subscribe').and.callThrough();
    component.deleteHeroe(heroeId);
  });

});


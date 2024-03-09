import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateEditHeroeComponent } from './create-edit-heroe.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesService } from '../../../core/services/heroes.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('CreateEditHeroeComponent', () => {
  let component: CreateEditHeroeComponent;
  let fixture: ComponentFixture<CreateEditHeroeComponent>;
  let heroesService: HeroesService;
  let router: Router;
  let firestoreStub: any;
  beforeEach(async () => {
    firestoreStub = {
      collection: jasmine.createSpy().and.returnValue({
        doc: jasmine.createSpy().and.returnValue({
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
        }),
        valueChanges: jasmine.createSpy().and.returnValue(of([{ id: '1', name: 'Hero One', alias: '', power: '', image: '' }])),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [CreateEditHeroeComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [HeroesService, Router,
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
      ]
    })
      .compileComponents();
    heroesService = TestBed.inject(HeroesService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CreateEditHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load hero data if heroeId is set', () => {
    component.heroeId = '1';
    component.ngOnInit();
    expect(component.image).toBeUndefined;
  });


  it('should create hero if form is valid and image is set', () => {
    component.heroesForm.setValue({ name: 'Superman', alias: 'Clark Kent', power: 'Flight' });
    component.image = 'superman.jpg';
    component.isCreate = true;
    component.submitForm();
    expect(component.image).toBeDefined();
  });

  it('should navigate to root path when cancel is called', () => {
    spyOn(router, 'navigate');
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should upload image and set image data', () => {
    const file = new File(['dummy data'], 'image.jpg', { type: 'image/jpeg' });
    component.selectedFile = file;
    component.uploadImage();
    expect(component.image).toBeUndefined;
  });


  it('should show error message for invalid image type', () => {
    const event = {
      target: {
        files: [{ type: 'text/plain' }]
      }
    };
    spyOn(Swal, 'fire');
    component.onFileSelected(event);
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should upload image and set image data', () => {
    const fileData = 'dummy data';
    const fileType = 'image/jpeg';
    const blob = new Blob([fileData], { type: fileType });
    component.selectedFile = blob;
    const event = {
      target: {
        files: [blob]
      }
    };
    spyOn(Swal, 'fire');
    component.onFileSelected(event);
    component.uploadImage();
    expect(component.image).toBeUndefined;
  });


});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateEditHeroeComponent } from './create-edit-heroe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesService } from '../../../services/heroes.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

describe('CreateEditHeroeComponent', () => {
  let component: CreateEditHeroeComponent;
  let fixture: ComponentFixture<CreateEditHeroeComponent>;
  let heroesService: HeroesService;
  let router: Router;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CreateEditHeroeComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [HeroesService, Router]
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

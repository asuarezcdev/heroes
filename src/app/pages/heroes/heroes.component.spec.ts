import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeroesService } from '../../../services/heroes.service';
import { of } from 'rxjs';
import { Hero } from '../../types/heroes';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let router: Router;
  let dialog: MatDialog;
  let heroesService: HeroesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [Router, HeroesService]
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


  it('should load data and set isLoading to false after 1 second', () => {
    const mockHeroes: Hero[] = [{ id: '1', name: 'Hero 1', alias: 'hero', power: '', image: '' }];
    heroesService.heroes$ = of(mockHeroes);
    component.loadData();
    setTimeout(() => {
      expect(component.isLoading).toBeFalse();
      expect(component.heroes).toEqual(mockHeroes);
      expect(component.originalHeroesList).toEqual(mockHeroes);
    }, 1000);
  });

  it('should create or edit hero', () => {
    component.createOrEditHero(true);
    expect(router.navigate).toHaveBeenCalledWith(['/heroe', { type: 'create' }]);
    component.createOrEditHero(false, '1');
    expect(router.navigate).toHaveBeenCalledWith(['/heroe', { type: 'edit', id: '1' }]);
  });


  it('should search and filter heroes list', () => {
    component.originalHeroesList = [
      { name: 'Superman', alias: 'Clark Kent', power: '', id: '1', image: '' },
      { name: 'Batman', alias: 'Bruce Wayne', power: '', id: '2', image: '' }
    ];
    const searchTerm = { target: { value: 'man' } };
    component.search(searchTerm);
    expect(component.heroes.length).toBe(2);
    expect(component.heroes[0].name).toBe('Superman');
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


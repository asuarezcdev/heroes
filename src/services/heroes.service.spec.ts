import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../app/types/heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should update heroes list', () => {
    const heroes: Hero[] = [{ id: '1', name: 'Hero 1', alias: '', image: '', power: '' }];
    service.updateHeroesList(heroes);
    expect(service.heroes.value).toEqual(heroes);
    expect(localStorage.getItem('heroesList')).toEqual(JSON.stringify(heroes));
  });

  it('should edit a hero', () => {
    const heroToModify: Hero = { id: '1', name: 'Superman', alias: 'Clark Kent', image: 'superman.jpg', power: 'Flight' };
    service.editHero(heroToModify);
    expect(service.heroesList).toBeDefined;
  });

  it('should delete a hero', () => {
    const heroId = '1';
    service.deleteHero(heroId);
    expect(service.heroesList.some(hero => hero.id === heroId)).toBeFalse();
  });

  

  it('should find a hero by id', () => {
    const heroId = '1';
    service.heroesList = [{
      id: '1',
      alias: 'test',
      image: '',
      name: 'Superman',
      power: ''
    }]
    const foundHero = service.findHeroById(heroId);
    expect(foundHero?.id).toEqual(heroId);
  });

});

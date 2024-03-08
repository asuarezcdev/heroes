import { Hero } from '../types/heroes';
import { HeroFilterPipe } from './hero-filter.pipe';

describe('HeroFilterPipe', () => {
  let pipe: HeroFilterPipe;
  let mockHeroes: Hero[];

  beforeEach(() => {
    pipe = new HeroFilterPipe();
    mockHeroes = [
      { id: '1', name: 'Spiderman', alias: '', power: '', image: '' },
      { id: '2', name: 'Ironman', alias: '', power: '', image: '' },
      { id: '3', name: 'Thor', alias: '', power: '', image: '' }
    ];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter heroes by name', () => {
    const searchTerm = 'thor';
    const filteredHeroes = pipe.transform(mockHeroes, searchTerm);
    expect(filteredHeroes.length).toBe(1);
    expect(filteredHeroes[0].name).toBe('Thor');
  });

  it('should return all heroes when search term is empty', () => {
    const searchTerm = '';
    const filteredHeroes = pipe.transform(mockHeroes, searchTerm);
    expect(filteredHeroes.length).toBe(mockHeroes.length);
  });

  it('should be case insensitive', () => {
    const searchTerm = 'spiderman';
    const filteredHeroes = pipe.transform(mockHeroes, searchTerm.toUpperCase());
    expect(filteredHeroes.length).toBe(1);
    expect(filteredHeroes[0].name).toBe('Spiderman');
  });

  it('should return the original array when search term is empty', () => {
    const searchTerm = ''; 
    const filteredHeroes = pipe.transform(mockHeroes, searchTerm);
    expect(filteredHeroes.length).toBe(mockHeroes.length);
  });

  it('should return the original array when search term is undefined', () => {
    const searchTerm = undefined; 
    const filteredHeroes = pipe.transform(mockHeroes, searchTerm as any); 
    expect(filteredHeroes).toEqual(mockHeroes);
  });
});
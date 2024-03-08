import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../types/heroes';

@Pipe({
  name: 'heroFilter',
  standalone: true
})
export class HeroFilterPipe implements PipeTransform {
  transform(heroes: Hero[], searchTerm: string): Hero[] {
    if (!heroes || !searchTerm) {
      return heroes;
    }

    searchTerm = searchTerm.toLowerCase();

    return heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm)
    );
  }
}

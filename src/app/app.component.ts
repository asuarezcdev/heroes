import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroesService } from '../services/heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SharedModule, HeroesComponent, RouterOutlet, HttpClientModule],
  providers: [HttpClient, HeroesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//export class AppComponent {
  //title = 'Heroes';
//}


export class AppComponent {
  item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {
    const itemCollection = collection(this.firestore, 'heroes');
    console.log('co', itemCollection);
    this.item$ = collectionData(itemCollection);
    console.log('items', this.item$);
  }
}


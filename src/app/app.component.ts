import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroesService } from '../core/services/heroes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SharedModule, HeroesComponent, RouterOutlet, HttpClientModule],
  providers: [HttpClient, HeroesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Heroes';
}



import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HeroesService } from '../../../services/heroes.service';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';
import { Hero } from '../../types/heroes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [SharedModule, FormsModule, MatCardModule, HttpClientModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, RouterOutlet],
  providers: [HeroesService, HttpClient],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [];
  originalHeroesList: Hero[] = [];
  searchTerm: string = '';
  isCreate: boolean = false;
  isLoading: boolean = true;

  constructor(private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.heroesService.getHeroes();
    this.heroesService.heroes$.subscribe((res: Hero[]) => {
      this.heroes = res;
      this.originalHeroesList = res;
    });
    //To simulate the time it takes for a call to respond.
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }


  createOrEditHero(isCreate: boolean, id?: string): void {
    if (isCreate) {
      this.router.navigate(['/heroe', { type: 'create' }]);
    } else {
      this.router.navigate(['/heroe', { type: 'edit', id: id }]);
    }
  }

  deleteHeroe(heroeId: string | undefined): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
    });
    dialogRef.componentInstance.confirmDelete.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.heroesService.deleteHero(heroeId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There has been a problem, please try again later."
        });
      }
    }); dialogRef.componentInstance
  }


  search(searchTerm: any): void {
    const searchTermValue = searchTerm.target.value;
    const filteredHeroes = this.originalHeroesList.filter((hero: { name: string; alias: string; }) => {
      return hero.name.toLowerCase().includes(searchTermValue.toLowerCase()) || hero.alias.toLowerCase().includes(searchTermValue.toLowerCase());
    });
    this.heroes = filteredHeroes;
  }

}

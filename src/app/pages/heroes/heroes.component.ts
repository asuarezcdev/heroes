import { ChangeDetectionStrategy, Component, NgModule, signal, ChangeDetectorRef } from '@angular/core';
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
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-heroes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, MatTooltipModule, HeroFilterPipe, FormsModule, MatCardModule, HttpClientModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, RouterOutlet],
  providers: [HeroesService, HttpClient],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  @NgModule({
    declarations: [HeroFilterPipe]
  })
  originalHeroesList: Hero[] = [];
  searchTerm: string = '';
  isCreate: boolean = false;
  isLoading: boolean = true;
  heroes = signal<Hero[]>([]);
  constructor(private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.heroesService.getHeroes();
    this.heroesService.heroes$.subscribe({
      next: (res: Hero[]) => {
        if (res.length > 0) {
          this.heroes.set(res);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      }
    });
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

}

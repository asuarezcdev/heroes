import { ChangeDetectionStrategy, Component, NgModule, signal } from '@angular/core';
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
//import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';



@Component({
  selector: 'app-heroes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, HeroFilterPipe, FormsModule, MatCardModule, HttpClientModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, RouterOutlet],
  providers: [HeroesService, HttpClient],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  @NgModule({
    declarations: [HeroFilterPipe]
  })
  heroes: Hero[] = [];
  originalHeroesList: Hero[] = [];
  searchTerm: string = '';
  isCreate: boolean = false;
  isLoading: boolean = false;
  users = signal<any[]>([]);  //se usa parentesis en el html, porque cuando la señal cambie se va a actualizar el html. La señal solo eso del dom lo actualiza no necesitamos onPush
  currentPage = signal<number>(1);

  constructor(private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  //antes angular buscaba en todo a ver que cosa cambió, ahora solo actualiza las referencias afectadas

  ngOnInit(): void {
    this.loadData();
  }

  loadData_(): void {
    this.heroesService.getHeroes();
    this.heroesService.heroes$.subscribe((res: Hero[]) => {
      this.heroes = res;
      this.originalHeroesList = res;
    });
    //To simulate the time it takes for a call to respond.
    setTimeout(() => {
      this.isLoading = true;
    }, 300);
  }

  loadData(): void {
    this.heroesService.getHeroes();
    this.heroesService.heroes$.subscribe((res: Hero[]) => {
      // Crear una nueva referencia de los datos para respetar la inmutabilidad
      console.log('res', res);
      //this.heroes = [...res];
      //this.originalHeroesList = [...res];
      //this.heroes = res;
      this.users.set([...res]);
      this.isLoading = false;
    });
    //To simulate the time it takes for a call to respond.
    // setTimeout(() => {
    //this.isLoading = false;
    //}, 300);
  }

  //loadPage(page: number) {
  //this.currentPage.set(page);
  //}

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


  // search(searchTerm: any): void {
  //const searchTermValue = searchTerm.target.value;
  //const filteredHeroes = this.originalHeroesList.filter((hero: { name: string; alias: string; }) => {
  //return hero.name.toLowerCase().includes(searchTermValue.toLowerCase()) || hero.alias.toLowerCase().includes(searchTermValue.toLowerCase());
  //});
  ////this.users.set(filteredHeroes);
  //}

}

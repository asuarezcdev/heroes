import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SafeUrl } from '@angular/platform-browser';
import { HeroesService } from '../../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-heroe',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, SharedModule, HttpClientModule],
  providers: [HttpClient, HeroesService],
  templateUrl: './create-edit-heroe.component.html',
  styleUrl: './create-edit-heroe.component.css'
})

export class CreateEditHeroeComponent {
  heroesForm: FormGroup;
  title: string = '';
  image: SafeUrl | undefined;
  selectedFile!: Blob;
  heroeId: string | null;
  isCreate: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    public fb: FormBuilder) {
    this.heroesForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$'), this.firstLetterUppercase()]],
      alias: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      power: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
    });
    const type = this.route.snapshot.paramMap.get('type');
    this.isCreate = type === 'create';
    this.isCreate ? this.title = 'Create' : this.title = 'Edit';
    this.heroeId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    if (this.heroeId) {
      const hero = await this.heroesService.findHeroById(this.heroeId);
      this.heroesForm.patchValue({
        name: hero?.name,
        alias: hero?.alias,
        power: hero?.power,
      });
      this.image = hero?.image;
    }
  }

  firstLetterUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.length > 0) {
        const firstLetter = value.charAt(0);
        if (firstLetter !== firstLetter.toUpperCase()) {
          return { firstLetterUppercase: true };
        }
      }
      return null;
    };
  }


  submitForm(): void {
    if (this.heroesForm.valid && this.image) {
      const heroe = {
        ...this.heroesForm.value,
        id: this.heroeId ? this.heroeId : '',
        image: this.image
      };
      if (this.isCreate) {
        this.heroesService.createHero(heroe);
      } else {
        this.heroesService.editHero(heroe);
      }
      const customText: string = this.isCreate ? 'created' : 'edited';
      Swal.fire({
        title: customText.charAt(0).toUpperCase() + customText.slice(1),
        text: `Your hero has been ${customText}.`,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete all fields in the form correctly",
      });
    }
  }


  cancel(): void {
    this.router.navigate(['/']);
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        this.selectedFile = file;
        this.uploadImage();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a valid JPEG or PNG file.",
        });
      }
    }
  }

  uploadImage(): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }



}

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeroesService } from '../services/heroes.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
 
  providers: [provideRouter(routes), HeroesService,
  importProvidersFrom([
    provideFirebaseApp(() => initializeApp(
      {
        apiKey: "AIzaSyAM9aTo0K0p3bqhBgPrvsJvuFPPdLRWWcg",
        authDomain: "heroes-4dc58.firebaseapp.com",
        projectId: "heroes-4dc58",
        storageBucket: "heroes-4dc58.appspot.com",
        messagingSenderId: "607787966902",
        appId: "1:607787966902:web:fdfce8e304250c7ee76117"
      }
    )),
    provideFirestore(() => getFirestore()),
  ]),
  provideHttpClient(withInterceptors(
    []
  )), provideAnimations(),],
};


 
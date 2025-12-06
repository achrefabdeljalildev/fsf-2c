// app-config.module.ts
import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
      }
      }
    })
  ]
})
export class AppConfigModule {}
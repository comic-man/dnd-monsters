import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Your main component
import {provideHttpClient, withFetch} from '@angular/common/http'; // Correct modern module
import { MonsterService } from './app/monster.service';
import {CommonModule} from "@angular/common"; // Service to handle API calls

// Bootstrapping the standalone application
bootstrapApplication(AppComponent, {
  providers: [
    MonsterService,
    provideHttpClient(
      withFetch()
    ),
    CommonModule// Register the service
  ],

}).catch(err => console.error(err));

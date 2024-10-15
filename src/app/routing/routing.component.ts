import { Component } from '@angular/core';
import { Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {MonsterSearchComponent} from '../monster-search/monster-search.component';

@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [],
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.css'
})
export class RoutingComponent {

}
 export const routes: Routes = [
  { path:  '', redirectTo:'monster-search', pathMatch: 'full' },
  { path:  'monster-search', component:  MonsterSearchComponent },
];






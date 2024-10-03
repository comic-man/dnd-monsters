import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {CommonModule} from '@angular/common';
import {MonsterService} from './monster.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'DnD';
  monsterName:string = '';
  monsterResult:string = '';

constructor(private monsterService: MonsterService) {
}

ngOnInit(): void {}


//Method for searching for the monster
searchMonster(): void {
  if (!this.monsterName){
    this.monsterResult = 'Please enter a monster name';
    return;
  }

  this.monsterResult = 'Searching...';

  //Fetching the list of monsters
  this.monsterService.getMonster().subscribe(
    (response) => {
      const monsters = response.results;
      const matchedMonster = monsters.find(
        (monster: any) => monster.name.toLowerCase() === this.monsterName.toLowerCase()
      );

      if (matchedMonster) {
        //Getting the details of the monster
        this.monsterService.getMonsterDetails(matchedMonster.index).subscribe(
          (monsterResponse: any) => {
            console.log(monsterResponse);
            this.monsterResult = `<h2>${monsterResponse.name}</h2><p><strong>Index:</strong> ${monsterResponse.index}</p>`;
          },
          (error) => {
            this.monsterResult = 'There was a problem fetching the monster details';
            }
          );
      } else {
        this.monsterResult = 'Monster not found';
      }
    },
    (error) => {
      this.monsterResult = 'There was a problem fetching the monster list';
    }
    );
      }
    }




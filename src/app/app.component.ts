import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {CommonModule} from '@angular/common';
import {MonsterService} from './monster.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title ='DnD';
  monster: any = {};
  monsterName: string = '';
  monsterResult: string = '';
  monsterIndex: any;

  constructor(private apollo: Apollo, private monsterService: MonsterService) {}

  ngOnInit(): void {
    // This could be called as needed
  }

  searchMonster(monsterIndex: any): void {
    if (!this.monsterName) {
      this.monsterResult = 'Please enter a monster name';
      return;
    }

    this.monsterResult = 'Searching...';

    // Fetch the list of monsters
    this.monsterService.getMonster().subscribe(
      (response: any) => {
        const monsters = response.results;
        const matchedMonster = monsters.find(
          (monster: any) => monster.name.toLowerCase() === this.monsterName.toLowerCase()
        );

        if (matchedMonster) {
          // Fetching the detailed monster data by its index using GraphQL
          this.getMonsterDetails(matchedMonster.index);
        } else {
          this.monsterResult = 'Monster not found';
        }
      },
      (error: any) => {
        this.monsterResult = 'There was a problem fetching the monster list';
      }
    );
  }

  getMonsterDetails(monsterIndex: string): void {
    const GET_MONSTER = gql`
      query Monster($index: String) {
        monster(index: $index) {
          name
        }
      }
    `;

    // Using Apollo to fetch the monster details via GraphQL
    this.apollo
      .watchQuery({
        query: GET_MONSTER,
        variables: { index: monsterIndex },  // Passing the index as a variable
      })
      .valueChanges.subscribe(
      (result: any) => {
        const monsterResponse = result?.data?.monster;
        console.log(monsterResponse);
        this.monsterResult = `
            <h2>${monsterResponse.name}</h2>
            <p><strong>Challenge Rating:</strong> ${monsterResponse.challenge_rating}</p>
            <p><strong>Hit Points:</strong> ${monsterResponse.hit_points}</p>
          `;
      },
      (error: any) => {
        this.monsterResult = 'There was a problem fetching the monster details';
      }
    );
  }
}




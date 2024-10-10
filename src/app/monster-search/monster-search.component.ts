import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-monster-search',
  templateUrl: './monster-search.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterOutlet
  ],
  standalone: true
})
export class MonsterSearchComponent implements OnInit {
  monsters: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getMonster('aboleth');

  }
  getMonster(index:string): void {
    const GET_MONSTER = gql`
      query Monster($index:String!) {
        monster(index:$index) {
            name
            }
          }
    `;

    this.apollo
      .watchQuery({
        query: GET_MONSTER,
        variables: { index }
      })
      .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.monsters = result?.data?.monsters;
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-monster-search',
  templateUrl: './monster-search.component.html',
  standalone: true
})
export class MonsterSearchComponent implements OnInit {
  monsters: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getMonsters('aboleth');
  }

  getMonsters(index:string): void {
    const GET_MONSTERS = gql`
      query Monster($index:String!) {
        monster(index:$index) {
            name
            armor_class {
              value
              type
            }
          }
        }
    `;

    this.apollo
      .watchQuery({
        query: GET_MONSTERS,
        variables: { index }
      })
      .valueChanges.subscribe((result: any) => {
      this.monsters = result?.data?.monsters;
    });
  }
}

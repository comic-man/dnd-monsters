import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-monster-search',
  templateUrl: './monster-search.component.html',
  standalone: true
})
export class MonsterSearchComponent implements OnInit {
  monsters: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getMonsters();
  }

  getMonsters(): void {
    const GET_MONSTERS = gql`
      {
        monsters {
          index
          name
          size
          type
          alignment
          armor_class {
            value
            type
          }
          hit_points
          hit_dice
          hit_points_roll
          speed {
            walk
            swim
            fly
            burrow
            climb
          }
          strength
          dexterity
          constitution
          intelligence
          wisdom
          charisma
          proficiencies {
            value
            proficiency {
              index
              name
              url
            }
          }
          damage_vulnerabilities
          damage_resistances
          damage_immunities
          condition_immunities
          senses {
            blindsight
            darkvision
            tremorsense
            truesight
            passive_perception
          }
          languages
          challenge_rating
          proficiency_bonus
          xp
          special_abilities [
            name
            desc
            spellcasting {
              level
              ability{
                index
                name
                url
                }
              dc
              modifier
              components_required
              {
              }
          ]

        }
      }
    `;

    this.apollo
      .watchQuery({
        query: GET_MONSTERS,
      })
      .valueChanges.subscribe((result: any) => {
      this.monsters = result?.data?.monsters;
    });
  }
}

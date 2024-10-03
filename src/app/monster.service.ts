import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  private apiUrl = 'https://www.dnd5eapi.co/api/monsters';
  constructor(private http: HttpClient) { }

  //Method for getting all the monsters
  getMonster(): Observable<any> {
  return this.http.get(this.apiUrl);
  }

  //Method for getting a specific monster by URL
  getMonsterDetails(url:string): Observable<any> {
    const fullUrl = `${(this.apiUrl)}`;
    return this.http.get(this.apiUrl);
  }
}

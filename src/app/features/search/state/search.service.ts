import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/envionment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getData(pageNumber:number, param:string, mode: string): Observable<any> {
    console.log("in service", pageNumber, param, mode)
    return this.http.get<any[]>(
      `${environment.baseUrl}/search/${mode}?api_key=${environment.apiKey}&query=${param}&page=${pageNumber}`);
  }
}

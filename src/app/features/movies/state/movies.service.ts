import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/envionment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getData(pageNumber:number): Observable<any> {
    console.log("in service", pageNumber)
    return this.http.get<any[]>(`${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${pageNumber}`);
  }
}

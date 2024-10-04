import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/envionment';

@Injectable({
  providedIn: 'root',
})
export class MediaDetailsService {
  constructor(private http: HttpClient) {}
  getData(id:number, mode: string): Observable<any> {
    return this.http.get<any[]>(`${environment.baseUrl}/${mode}/${id}?api_key=${environment.apiKey}`);
  }
}

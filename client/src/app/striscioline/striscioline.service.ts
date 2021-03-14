import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Striscioline } from './striscioline';

@Injectable({
  providedIn: 'root',
})
export class StrisciolineService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Striscioline[]> {
    return this.http.get<Striscioline[]>('./assets/questions.json');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StrisciolineService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<string[]> {
    return this.http.get<string[]>('./assets/questions.json');
  }
}

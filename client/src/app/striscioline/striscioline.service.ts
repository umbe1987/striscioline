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

  formatQA(qaStr: string): string[][] {
    // convert string to array by commas (https://stackoverflow.com/a/2858130/1979665)
    // convert flat array to pair QA (https://stackoverflow.com/a/44996257/1979665)
    return qaStr.split(',').reduce((result, _, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
  }
}

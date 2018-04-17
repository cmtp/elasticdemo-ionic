import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SearchServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchService {

  readonly URL: string = 'http://localhost:8080/rest/students';

  constructor(public http: HttpClient) {
    console.log('Hello SearchServiceProvider Provider');
    console.log(this.URL);
  }

  getStudents() {
    return this.http.get(this.URL);
  }

  searchStudent(query: string) {
    return this.http.get(this.URL + '/search?query=' + query);
  }
}

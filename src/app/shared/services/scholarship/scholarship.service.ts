import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Scholarship } from './scholarship';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {

  private scholarshipUrl = 'https://testapi.io/api/redealumni/scholarships';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET scholarships from the server */
  getScholarships(): Observable<Scholarship[]> {
    return this.http.get<Scholarship[]>(this.scholarshipUrl)
      .pipe(
        tap(scholarships => this.log('fetched scholarships')),
        catchError(this.handleError('getScholarships', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ScholarshipService message */
  private log(message: string) {
    console.log(`ScholarshipService: ${message}`);
  }

}

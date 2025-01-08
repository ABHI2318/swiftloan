import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private baseUrl = 'http://localhost:8080/loanapp/submitQuery'; // URL of your backend
  
  constructor(private http: HttpClient) {}

  // Method to submit the query data without FormData (simpler data submission)
  submitQueryapplication(application: { query: string; querytype: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, application)
      .pipe(
        catchError(error => {
          console.error('Error occurred while submitting application:', error);
          return throwError(error); // Propagate error
        })
      );
  }

  // Method to submit the query using FormData and userId as query parameter
  submitQuery(data: FormData): Observable<any> {
  
    
    return this.http.post<any>(this.baseUrl, data)
      .pipe(
        catchError(error => {
          console.error('Error occurred while submitting query:', error);
          return throwError(error); // Propagate error
        })
      );
  }
}
// }
// private submitQueryUrl = 'http://localhost:8080/loanapp/submitQuery'; // Update with your backend endpoint
// private getQueriesUrl =  'http://localhost:8080/loanapp/allqueries'; // Update with your backend endpoint

// constructor(private http: HttpClient) {}

// submitQuery(queryRequest: any): Observable<any> {
//   return this.http.post<any>(this.submitQueryUrl, queryRequest);
// }

// getSubmittedQueries(): Observable<any[]> {
//   return this.http.get<any[]>(this.getQueriesUrl);
// }
// }
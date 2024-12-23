import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Salary } from "../models/salary.interface";

@Injectable({
  providedIn: "root",
})
export class SalaryService {
  private salariesUrl = "api/salaries"; // URL to In-Memory Web API

  constructor(private http: HttpClient) {}

  getSalaries(): Observable<Salary[]> {
    return this.http
      .get<Salary[]>(this.salariesUrl)
      .pipe(catchError(this.handleError<Salary[]>("getSalaries", [])));
  }

  getSalary(id: number): Observable<Salary> {
    const url = `${this.salariesUrl}/${id}`;
    return this.http
      .get<Salary>(url)
      .pipe(catchError(this.handleError<Salary>(`getSalary id=${id}`)));
  }

  addSalary(salary: Salary): Observable<Salary> {
    return this.http
      .post<Salary>(this.salariesUrl, salary)
      .pipe(catchError(this.handleError<Salary>("addSalary")));
  }

  updateSalary(salary: Salary): Observable<any> {
    return this.http
      .put(this.salariesUrl, salary)
      .pipe(catchError(this.handleError<any>("updateSalary")));
  }

  deleteSalary(id: number): Observable<Salary> {
    const url = `${this.salariesUrl}/${id}`;
    return this.http
      .delete<Salary>(url)
      .pipe(catchError(this.handleError<Salary>("deleteSalary")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Employee } from "../models/employee.interface";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private employeesUrl = "api/employees"; // URL to in-memory web API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeesUrl)
      .pipe(catchError(this.handleError<Employee[]>("getEmployees", [])));
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http
      .get<Employee>(url)
      .pipe(catchError(this.handleError<Employee>(`getEmployee id=${id}`)));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee)
      .pipe(catchError(this.handleError<Employee>("addEmployee")));
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http
      .put(this.employeesUrl, employee)
      .pipe(catchError(this.handleError<any>("updateEmployee")));
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http
      .delete<Employee>(url)
      .pipe(catchError(this.handleError<Employee>("deleteEmployee")));
  }

  // Error handling
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Department } from "../models/department.interface";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  private departmentsUrl = "api/departments"; // URL to in-memory web API

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http
      .get<Department[]>(this.departmentsUrl)
      .pipe(catchError(this.handleError<Department[]>("getDepartments", [])));
  }

  getDepartment(id: number): Observable<Department> {
    const url = `${this.departmentsUrl}/${id}`;
    return this.http
      .get<Department>(url)
      .pipe(catchError(this.handleError<Department>(`getDepartment id=${id}`)));
  }

  addDepartment(department: Department): Observable<Department> {
    return this.http
      .post<Department>(this.departmentsUrl, department)
      .pipe(catchError(this.handleError<Department>("addDepartment")));
  }

  updateDepartment(department: Department): Observable<any> {
    return this.http
      .put(this.departmentsUrl, department)
      .pipe(catchError(this.handleError<any>("updateDepartment")));
  }

  deleteDepartment(id: number): Observable<Department> {
    const url = `${this.departmentsUrl}/${id}`;
    return this.http
      .delete<Department>(url)
      .pipe(catchError(this.handleError<Department>("deleteDepartment")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

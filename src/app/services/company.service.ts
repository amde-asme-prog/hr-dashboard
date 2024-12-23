import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Company } from "../models/company.interface";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  private companiesUrl = "api/companies"; // URL to in-memory web API

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http
      .get<Company[]>(this.companiesUrl)
      .pipe(catchError(this.handleError<Company[]>("getCompanies", [])));
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http
      .get<Company>(url)
      .pipe(catchError(this.handleError<Company>(`getCompany id=${id}`)));
  }

  addCompany(company: Company): Observable<Company> {
    return this.http
      .post<Company>(this.companiesUrl, company)
      .pipe(catchError(this.handleError<Company>("addCompany")));
  }

  updateCompany(company: Company): Observable<any> {
    return this.http
      .put(this.companiesUrl, company)
      .pipe(catchError(this.handleError<any>("updateCompany")));
  }

  deleteCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http
      .delete<Company>(url)
      .pipe(catchError(this.handleError<Company>("deleteCompany")));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

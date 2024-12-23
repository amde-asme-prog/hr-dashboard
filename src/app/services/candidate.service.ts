import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidate } from "../models/candidate.interface";

@Injectable({
  providedIn: "root",
})
export class CandidateService {
  private baseUrl = "api/candidates"; // URL to web api

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.baseUrl);
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.baseUrl, candidate);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(
      `${this.baseUrl}/${candidate.id}`,
      candidate
    );
  }

  deleteCandidate(id: number): Observable<Candidate> {
    return this.http.delete<Candidate>(`${this.baseUrl}/${id}`);
  }
}

import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../../services/candidate.service";
import { MatDialog } from "@angular/material/dialog";
import { Candidate } from "src/app/models/candidate.interface";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";
import { DepartmentService } from "../../services/department.service";
import { CompanyService } from "../../services/company.service";
import { Department } from "../../models/department.interface";
import { Company } from "../../models/company.interface";

@Component({
  selector: "app-candidate",
  templateUrl: "./candidate.component.html",
  styleUrls: ["./candidate.component.css"],
})
export class CandidateComponent implements OnInit {
  candidates: Candidate[] = [];
  departments: Department[] = [];
  companies: Company[] = [];
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
    "positionApplied",
    "resumeUrl",
    "applicationDate",
    "status",
    "actions",
  ];

  constructor(
    private candidateService: CandidateService,
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCandidates();
    this.loadDepartments();
    this.loadCompanies();
  }

  loadCandidates(): void {
    this.candidateService.getCandidates().subscribe((candidates) => {
      this.candidates = candidates;
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  getPositionApplied(departmentId: number, companyId: number): string {
    const department = this.departments.find((d) => d.id === departmentId);
    const company = this.companies.find((c) => c.id === companyId);

    if (department && company) {
      return `${department.name} at ${company.name}`;
    }
    return "Unknown Position";
  }

  openDialog(candidate?: Candidate): void {
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      data: candidate ? candidate : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.candidateService
            .updateCandidate(result)
            .subscribe(() => this.loadCandidates());
        } else {
          this.candidateService
            .addCandidate(result)
            .subscribe(() => this.loadCandidates());
        }
      }
    });
  }

  deleteCandidate(id: number): void {
    this.candidateService
      .deleteCandidate(id)
      .subscribe(() => this.loadCandidates());
  }
}

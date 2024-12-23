import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Candidate } from "src/app/models/candidate.interface";
import { Company } from "src/app/models/company.interface";
import { Department } from "src/app/models/department.interface";
import { CompanyService } from "src/app/services/company.service";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-candidate-form",
  templateUrl: "./candidate-form.component.html",
  styleUrls: ["./candidate-form.component.css"],
})
export class CandidateFormComponent implements OnInit {
  candidate: Candidate;
  allDepartments: Department[] = []; // All departments from the service
  filteredDepartments: Department[] = []; // Departments filtered by selected company
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<CandidateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate,
    private departmentService: DepartmentService,
    private companyService: CompanyService
  ) {
    this.candidate = { ...data };
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.allDepartments = departments;
      this.filterDepartmentsByCompany(this.candidate.companyId); // Initial filter
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  onCompanyChange(): void {
    this.filterDepartmentsByCompany(this.candidate.companyId);
  }

  filterDepartmentsByCompany(companyId: number): void {
    if (companyId) {
      this.filteredDepartments = this.allDepartments.filter(
        (department) => department.companyId === companyId
      );
    } else {
      this.filteredDepartments = [];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

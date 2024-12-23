import { Component, OnInit } from "@angular/core";
import { DepartmentService } from "../../services/department.service";
import { MatDialog } from "@angular/material/dialog";
import { Department } from "src/app/models/department.interface";
import { DepartmentDialogComponent } from "./department-dialog/department-dialog.component";
import { CompanyService } from "src/app/services/company.service";
import { Company } from "src/app/models/company.interface";
import { Salary } from "src/app/models/salary.interface";
import { SalaryService } from "src/app/services/salary.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  companies: Company[] = [];
  salaries: Salary[] = [];

  displayedColumns: string[] = [
    "department",
    "company",
    "description",
    "salary",
    "actions",
  ];

  constructor(
    private departmentService: DepartmentService,
    private companyService: CompanyService,
    private salaryService: SalaryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadCompanies();
    this.loadSalaries();
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

  loadSalaries(): void {
    this.salaryService.getSalaries().subscribe((salaries) => {
      this.salaries = salaries;
    });
  }

  getCompanyName(companyId: number): string {
    const company = this.companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown Company";
  }

  getDepartmentSalary(departmentId: number): number {
    const salary = this.salaries.find((s) => s.departmentId === departmentId);
    return salary ? salary.netSalary : 0;
  }

  openDialog(department?: Department): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      data: department ? department : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.departmentService
            .updateDepartment(result)
            .subscribe(() => this.loadDepartments());
        } else {
          this.departmentService
            .addDepartment(result)
            .subscribe(() => this.loadDepartments());
        }
      }
    });
  }

  deleteDepartment(id: number): void {
    this.departmentService
      .deleteDepartment(id)
      .subscribe(() => this.loadDepartments());
  }
}

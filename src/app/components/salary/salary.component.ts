import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Salary } from "src/app/models/salary.interface";
import { Company } from "src/app/models/company.interface";
import { Department } from "src/app/models/department.interface";
import { SalaryService } from "src/app/services/salary.service";
import { CompanyService } from "src/app/services/company.service";
import { DepartmentService } from "src/app/services/department.service";
import { SalaryDialogComponent } from "./salary-dialog/salary-dialog.component";

@Component({
  selector: "app-salary",
  templateUrl: "./salary.component.html",
  styleUrls: ["./salary.component.css"],
})
export class SalaryComponent implements OnInit {
  salaries: Salary[] = [];
  companies: Company[] = [];
  departments: Department[] = [];

  displayedColumns: string[] = [
    "company",
    "department",
    "baseSalary",
    "bonuses",
    "deductions",
    "netSalary",
    "actions",
  ];

  constructor(
    private salaryService: SalaryService,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSalaries();
    this.loadCompanies();
    this.loadDepartments();
  }

  loadSalaries(): void {
    this.salaryService.getSalaries().subscribe((salaries) => {
      this.salaries = salaries;
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  getCompanyName(companyId: number): string {
    const company = this.companies.find((comp) => comp.id === companyId);
    return company ? company.name : "Unknown Company";
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(
      (dept) => dept.id === departmentId
    );
    return department ? department.name : "Unknown Department";
  }

  openDialog(salary?: Salary): void {
    const dialogRef = this.dialog.open(SalaryDialogComponent, {
      data: {
        salary: salary ? salary : {},
        companies: this.companies,
        departments: this.departments,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.salary.id) {
          this.salaryService
            .updateSalary(result.salary)
            .subscribe(() => this.loadSalaries());
        } else {
          this.salaryService
            .addSalary(result.salary)
            .subscribe(() => this.loadSalaries());
        }
      }
    });
  }

  deleteSalary(id: number): void {
    this.salaryService.deleteSalary(id).subscribe(() => this.loadSalaries());
  }
}

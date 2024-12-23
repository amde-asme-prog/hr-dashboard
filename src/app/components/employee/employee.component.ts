import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../services/employee.service";
import { CompanyService } from "../../services/company.service";
import { DepartmentService } from "../../services/department.service";
import { MatDialog } from "@angular/material/dialog";
import { Employee } from "src/app/models/employee.interface";
import { Company } from "src/app/models/company.interface";
import { Department } from "src/app/models/department.interface";
import { EmployeeDialogComponent } from "./employee-dialog/employee-dialog.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  companies: Company[] = [];
  departments: Department[] = [];

  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "department",
    "company",
    "hireDate",
    "salary",
    "actions",
  ];

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadCompanies();
    this.loadDepartments();
  }

  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
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
    const company = this.companies.find((c) => c.id === companyId);
    return company ? company.name : "Unknown";
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find((d) => d.id === departmentId);
    return department ? department.name : "Unknown";
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: employee ? employee : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.employeeService
            .updateEmployee(result)
            .subscribe(() => this.loadEmployees());
        } else {
          this.employeeService
            .addEmployee(result)
            .subscribe(() => this.loadEmployees());
        }
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService
      .deleteEmployee(id)
      .subscribe(() => this.loadEmployees());
  }
}

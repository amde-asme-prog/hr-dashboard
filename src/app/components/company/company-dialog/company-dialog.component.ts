import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Company } from "src/app/models/company.interface";
import { Employee } from "src/app/models/employee.interface";
import { EmployeeService } from "src/app/services/employee.service"; // Assume this service fetches employees

@Component({
  selector: "app-company-dialog",
  templateUrl: "./company-dialog.component.html",
})
export class CompanyDialogComponent implements OnInit {
  employeeCount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
    private employeeService: EmployeeService // Inject EmployeeService
  ) {}

  ngOnInit(): void {
    this.countEmployees();
    this.data.employeeCount = this.employeeCount; // Initialize employee count in company data
  }

  /**
   * Counts the number of employees associated with the company.
   */
  countEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employeeCount = employees.filter(
        (emp) => emp.companyId === this.data.id
      ).length; // Count employees belonging to this company
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}

import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InMemoryDataService } from "src/app/in-memory-data.service";

@Component({
  selector: "app-employee-dialog",
  templateUrl: "./employee-dialog.component.html",
  styleUrls: ["./employee-dialog.component.css"],
})
export class EmployeeDialogComponent {
  companies = [];
  departments = [];
  salaries = [];
  filteredDepartments = [];

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: InMemoryDataService
  ) {
    const db = this.dataService.createDb();
    this.companies = db.companies || [];
    this.departments = db.departments || [];
    this.salaries = db.salaries || [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCompanyChange(companyId: string): void {
    // Filter departments by companyId
    this.filteredDepartments = this.departments.filter(
      (dept) => dept.companyId === companyId
    );
    // Reset department and salary if company changes
    this.data.department = null;
    this.data.salary = null;
  }

  onDepartmentChange(departmentId: string): void {
    const salaryRecord = this.salaries.find(
      (salary) =>
        salary.companyId === this.data.company &&
        salary.departmentId === departmentId
    );
    if (salaryRecord) {
      this.data.salary = salaryRecord.netSalary;
    } else {
      this.data.salary = 0; // Default if no salary found
    }
  }

  onSubmit(): void {
    console.log("Form Data:", this.data);
  }
}

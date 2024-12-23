import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Company } from "src/app/models/company.interface";
import { Department } from "src/app/models/department.interface";
import { Salary } from "src/app/models/salary.interface";

@Component({
  selector: "app-salary-dialog",
  templateUrl: "./salary-dialog.component.html",
  styleUrls: ["./salary-dialog.component.css"],
})
export class SalaryDialogComponent implements OnInit {
  companies: Company[] = [];
  filteredDepartments: Department[] = []; // To hold departments based on selected company

  constructor(
    public dialogRef: MatDialogRef<SalaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      salary: Salary;
      companies: Company[];
      departments: Department[];
    }
  ) {}

  ngOnInit(): void {
    this.filterDepartmentsByCompany(this.data.salary.companyId); // Set initial filtered departments
  }

  /**
   * Filters departments based on selected company.
   *
   * @param companyId The selected company's ID
   */
  filterDepartmentsByCompany(companyId: number): void {
    this.filteredDepartments = this.data.departments.filter(
      (dept) => dept.companyId === companyId
    );
  }

  /**
   * Handles company selection change from the dropdown
   *
   * @param event The selected company ID
   */
  onCompanyChange(event: any): void {
    this.filterDepartmentsByCompany(event.value); // Filter departments based on selected company
    this.data.salary.companyId = event.value; // Save selected company ID to salary data
    this.data.salary.departmentId = null; // Reset department ID when company changes
  }
  calculateNetSalary(): void {
    const baseSalary = this.data.salary.baseSalary || 0;
    const bonuses = this.data.salary.bonuses || 0;
    const deductions = this.data.salary.deductions || 0;
    this.data.salary.netSalary = baseSalary + bonuses - deductions;
  }

  /**
   * Handles change to salary components and updates net salary.
   */
  onSalaryChange(): void {
    this.calculateNetSalary();
  }

  /**
   * Handles cancel button click.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}

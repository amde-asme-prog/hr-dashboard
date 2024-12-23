import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Department } from "src/app/models/department.interface";
import { CompanyService } from "src/app/services/company.service"; // Adjust the import according to your project structure
import { Company } from "src/app/models/company.interface";

@Component({
  selector: "app-department-dialog",
  templateUrl: "./department-dialog.component.html",
  styleUrls: ["./department-dialog.component.css"],
})
export class DepartmentDialogComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Department,
    private companyService: CompanyService // Inject your CompanyService to fetch companies
  ) {}

  ngOnInit(): void {
    this.loadCompanies(); // Load companies when the dialog initializes
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close without any actions
  }

  onSave(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.data); // Send data back to the caller
    } else {
      alert("Please fill in all required fields.");
    }
  }

  private isValid(): boolean {
    return this.data.name && this.data.description && this.data.companyId
      ? true
      : false;
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CompanyService } from "../../services/company.service";
import { Company } from "src/app/models/company.interface";
import { CompanyDialogComponent } from "./company-dialog/company-dialog.component";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"],
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  displayedColumns: string[] = [
    "name",
    "location",
    "industry",
    "establishedYear",
    "employeeCount",
    "actions",
  ];

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }

  openDialog(company?: Company): void {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      data: company ? company : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.companyService
            .updateCompany(result)
            .subscribe(() => this.getCompanies());
        } else {
          this.companyService
            .addCompany(result)
            .subscribe(() => this.getCompanies());
        }
      }
    });
  }

  deleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe(() => this.getCompanies());
  }
}

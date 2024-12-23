import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// import {}

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { EmployeeComponent } from "./components/employee/employee.component";
import { CandidateComponent } from "./components/candidate/candidate.component";
import { CompanyComponent } from "./components/company/company.component";
import { SalaryComponent } from "./components/salary/salary.component";
import { HrComponent } from "./components/hr/hr.component";
import { XhrFactory } from "@angular/common/http";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MaterialModule } from "./material.module";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CandidateFormComponent } from "./components/candidate/candidate-form/candidate-form.component";
import { FormsModule } from "@angular/forms";
import { EmployeeDialogComponent } from "./components/employee/employee-dialog/employee-dialog.component";
import { CompanyDialogComponent } from "./components/company/company-dialog/company-dialog.component";
import { DepartmentComponent } from "./components/department/department.component";
import { DepartmentDialogComponent } from "./components/department/department-dialog/department-dialog.component";
import { SalaryDialogComponent } from "./components/salary/salary-dialog/salary-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CandidateComponent,
    CompanyComponent,
    SalaryComponent,
    HrComponent,
    DashboardComponent,
    SidebarComponent,
    CandidateFormComponent,
    DepartmentComponent,
    EmployeeDialogComponent,
    CompanyDialogComponent,
    DepartmentDialogComponent,
    SalaryDialogComponent,
  ],
  imports: [
    FormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      delay: 500, // Simulates server latency
    }),
  ],
  entryComponents: [
    CandidateFormComponent,
    EmployeeDialogComponent,
    CompanyDialogComponent,
    DepartmentDialogComponent,
    SalaryDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

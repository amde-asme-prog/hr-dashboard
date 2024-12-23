import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CandidateComponent } from "./components/candidate/candidate.component";
import { EmployeeComponent } from "./components/employee/employee.component";
import { CompanyComponent } from "./components/company/company.component";
import { DepartmentComponent } from "./components/department/department.component";
import { SalaryComponent } from "./components/salary/salary.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  }, // Default route
  { path: "employee", component: EmployeeComponent }, // Route for Employee table
  { path: "candidate", component: CandidateComponent },
  { path: "company", component: CompanyComponent },
  { path: "department", component: DepartmentComponent },
  { path: "salary", component: SalaryComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

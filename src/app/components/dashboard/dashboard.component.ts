import { Component, OnInit } from "@angular/core";
import { Candidate } from "src/app/models/candidate.interface";
import { Employee } from "src/app/models/employee.interface";
import { CandidateService } from "src/app/services/candidate.service";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  activeJobs: number = 0; //
  newApplications: number = 0;
  totalPayroll: number = 0;
  recentActivities: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.totalEmployees = employees.length;
      this.totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);

      this.activeJobs = this.calculateActiveJobs(employees); // Add your logic here
    });

    this.candidateService
      .getCandidates()
      .subscribe((candidates: Candidate[]) => {
        this.newApplications = candidates.length;
      });

    this.recentActivities = this.getRecentActivities();
  }

  calculateActiveJobs(employees: Employee[]): number {
    return employees.filter((emp) => emp.salary > 0).length;
  }

  getRecentActivities() {
    return [
      {
        avatar: "assets/avatar1.png", // Replace with actual avatars
        employee: "John Doe",
        department: "Development",
        status: "Completed",
        action: "Reviewed Application",
        time: new Date(),
      },
      {
        avatar: "assets/avatar2.png",
        employee: "Jane Smith",
        department: "HR",
        status: "Pending",
        action: "Interview Scheduled",
        time: new Date(),
      },
    ];
  }
}

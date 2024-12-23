import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Employee } from "./models/employee.interface";
import { Candidate } from "./models/candidate.interface";
import { Company } from "./models/company.interface";
import { Department } from "./models/department.interface";
import { Salary } from "./models/salary.interface";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const candidates: Candidate[] = [
      {
        id: 1,
        name: "Amde Asme",
        email: "amde.asme@example.com",
        phone: "123-456-7890",
        companyId: 1, // Tech Co
        departmentId: 1, // Development
        resumeUrl: "https://example.com/resume/johndoe",
        applicationDate: new Date(),
        status: "Pending",
      },
      {
        id: 2,
        name: "bemnet Smith",
        email: "bemnet.smith@example.com",
        phone: "098-765-4321",
        companyId: 1,
        departmentId: 1,
        resumeUrl: "https://example.com/resume/janesmith",
        applicationDate: new Date(),
        status: "Shortlisted",
      },
    ];

    const companies: Company[] = [
      {
        id: 1,
        name: "Xoka it solutions",
        location: "addis ababa",
        industry: "software development",
        establishedYear: 2000,
        employeeCount: 100,
      },
      {
        id: 2,
        name: "Design paradigm",
        location: "New York",
        industry: "graphics design",
        establishedYear: 1998,
        employeeCount: 150,
      },
      {
        id: 3,
        name: "Tech Co",
        location: "Silicon Valley",
        industry: "Technology",
        establishedYear: 2001,
        employeeCount: 200,
      },
    ];

    const employees: Employee[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        departmentId: 1, // Development
        companyId: 1, // Tech Co
        hireDate: new Date("2020-01-01"),
        salary: 30000,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        departmentId: 2, // Human Resources
        companyId: 1, // Tech Co
        hireDate: new Date("2019-05-15"),
        salary: 20000,
      },
    ];
    const departments: Department[] = [
      {
        id: 1,
        name: "Software Development",
        description: "Handles software development",
        companyId: 1,
        salary: 1, // Add salary here
      },
      {
        id: 2,
        name: "Human Resources",
        description: "Manages employee relations",
        companyId: 1,
        salary: 2, // Add salary here
      },
      {
        id: 3,
        name: "Designing",
        description: "Professionla designing of ui/ux",
        companyId: 1,
        salary: 2, // Add salary here
      },
    ];

    const salaries: Salary[] = [
      {
        id: 1,
        companyId: 1,
        departmentId: 1,
        baseSalary: 50000,
        bonuses: 5000,
        deductions: 2000,
        netSalary: 53000,
      },
      {
        id: 2,
        companyId: 1,
        departmentId: 2,
        baseSalary: 45000,
        bonuses: 4000,
        deductions: 1500,
        netSalary: 47500,
      },
    ];

    return { employees, candidates, companies, departments, salaries };
  }
}

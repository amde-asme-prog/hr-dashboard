export interface Salary {
  id: number;
  companyId: number;
  departmentId: number;
  baseSalary: number;
  bonuses?: number;
  deductions?: number;
  netSalary?: number;
}

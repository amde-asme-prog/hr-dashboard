export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: number;
  companyId: number;
  hireDate: Date;
  salary?: number;
}

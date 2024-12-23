export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  companyId: number;
  departmentId: number;
  resumeUrl: string;
  applicationDate: Date;
  status: "Pending" | "Shortlisted" | "Rejected" | "Accepted"; // Application status
}

import { Admin } from "./admin.model";

export interface AdminResponse {
    data: Admin[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
import { AdminPermission, AdminRole } from "./admin.model";

export interface AdminFilter {
    role?: AdminRole;
    status?: 'active' | 'inactive';
    searchTerm?: string;
    permissions?: AdminPermission[];
    sortBy?: 'name' | 'role' | 'lastLogin' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
  }
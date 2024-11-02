import { AdminPermission, AdminRole } from "./admin.model";

export interface AdminFormData {
    name: string;
    email: string;
    phone: string;
    role: AdminRole;
    address: string;
    permissions: AdminPermission[];
    avatar?: string;
    status: 'active' | 'inactive';
  }
  
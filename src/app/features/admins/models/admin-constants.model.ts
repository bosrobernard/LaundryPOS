import { AdminRole } from "./admin.model";

export const ADMIN_CONSTANTS = {
    ROLES: {
      SUPER_ADMIN: 'super_admin' as AdminRole,
      ADMIN: 'admin' as AdminRole,
      MANAGER: 'manager' as AdminRole
    },
    STATUS: {
      ACTIVE: 'active',
      INACTIVE: 'inactive'
    },
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      PAGE_SIZE_OPTIONS: [5, 10, 25, 50]
    },
    SORT: {
      DEFAULT_SORT_FIELD: 'createdAt',
      DEFAULT_SORT_DIRECTION: 'desc'
    }
  };
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  PROVIDER: 'provider',
  USER: 'user'
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

// Define role hierarchy (higher roles have access to lower role permissions)
export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  [ROLES.SUPER_ADMIN]: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PROVIDER, ROLES.USER],
  [ROLES.ADMIN]: [ROLES.ADMIN, ROLES.PROVIDER, ROLES.USER],
  [ROLES.PROVIDER]: [ROLES.PROVIDER, ROLES.USER],
  [ROLES.USER]: [ROLES.USER]
}

// Define role-based route access
export const ROUTE_ACCESS: Record<string, Role[]> = {
  '/dashboard': [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PROVIDER, ROLES.USER],
  '/users': [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  '/organization': [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  '/settings': [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  '/providers': [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  '/reports': [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  '/profile': [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PROVIDER, ROLES.USER],
  '/change-password': [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PROVIDER, ROLES.USER]
} 
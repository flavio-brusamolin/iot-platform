import { Role } from '../../enums/role'

export interface CheckMemberPermission {
  check: (teamId: string, memberId: string, allowedRoles: Role[]) => Promise<boolean>
}

export interface CheckIfIsTeamOwner {
  check: (teamId: string, memberId: string) => Promise<boolean>
}

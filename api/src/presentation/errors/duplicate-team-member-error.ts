export class DuplicateTeamMemberError extends Error {
  public constructor (email: string) {
    super(`The user with email '${email}' is already a member of the team`)
    this.name = 'DuplicateTeamMemberError'
  }
}

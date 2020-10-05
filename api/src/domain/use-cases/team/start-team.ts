import { Team } from '../../models/team'

export interface StartTeam {
  start: (userId: string) => Promise<Team>
}

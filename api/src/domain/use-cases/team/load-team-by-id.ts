import { Team } from '../../models/team'

export interface LoadTeamById {
  load: (teamId: string) => Promise<Team>
}

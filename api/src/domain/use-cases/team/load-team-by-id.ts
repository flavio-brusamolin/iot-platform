// import { Team } from '../../models/team'
import { FullTeam } from '../../models/team'

export interface LoadTeamById {
  load: (teamId: string) => Promise<FullTeam>
}

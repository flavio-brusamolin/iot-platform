import { Team } from '../../models/team'

export interface LoadTeams {
  load: (userId: string) => Promise<Team[]>
}

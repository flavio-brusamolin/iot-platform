import { Team } from '../../../../domain/models/team'

export interface LoadTeamsRepository {
  load: (userId: string) => Promise<Team[]>
}

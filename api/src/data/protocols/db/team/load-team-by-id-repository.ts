import { Team } from '../../../../domain/models/team'

export interface LoadTeamByIdRepository {
  loadById: (id: string) => Promise<Team>
}

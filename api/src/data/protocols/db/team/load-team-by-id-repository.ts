// import { Team } from '../../../../domain/models/team'
import { FullTeam } from '../../../../domain/models/team'

export interface LoadTeamByIdRepository {
  loadById: (id: string) => Promise<FullTeam>
}

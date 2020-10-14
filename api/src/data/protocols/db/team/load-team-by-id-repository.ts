import { CompleteTeamData } from '../../../../domain/use-cases/team/load-team-by-id'

export interface LoadTeamByIdRepository {
  loadById: (id: string) => Promise<CompleteTeamData>
}

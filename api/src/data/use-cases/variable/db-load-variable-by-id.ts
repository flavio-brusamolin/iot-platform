import { Variable } from '../../../domain/models/variable'
import { LoadVariableById } from '../../../domain/use-cases/variable/load-variable-by-id'
import { LoadVariableByIdRepository } from '../../protocols/db/variable/load-variable-by-id-repository'

export class DbLoadVariableById implements LoadVariableById {
  public constructor (private readonly loadVariableByIdRepository: LoadVariableByIdRepository) {}

  public async load (variableId: string): Promise<Variable> {
    return await this.loadVariableByIdRepository.loadById(variableId)
  }
}

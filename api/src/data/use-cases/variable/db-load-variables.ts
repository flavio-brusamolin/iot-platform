import { Variable } from '../../../domain/models/variable'
import { LoadVariables } from '../../../domain/use-cases/variable/load-variables'
import { LoadVariablesRepository } from '../../protocols/db/variable/load-variables-repository'

export class DbLoadVariables implements LoadVariables {
  public constructor (
    private readonly loadVariablesRepository: LoadVariablesRepository
  ) {}

  public async load (deviceId: string): Promise<Variable[]> {
    return await this.loadVariablesRepository.load(deviceId)
  }
}

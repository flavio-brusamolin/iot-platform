import { Variable } from '../../../domain/models/variable'
import { AddVariable, AddVariableModel } from '../../../domain/use-cases/variable/add-variable'
import { LoadVariableByKeyConstraintRepository } from '../../protocols/db/variable/load-variable-by-key-constraint-repository'
import { AddVariableRepository } from '../../protocols/db/variable/add-variable-repository'

export class DbAddVariable implements AddVariable {
  public constructor (
    private readonly loadVariableByKeyConstraintRepository: LoadVariableByKeyConstraintRepository,
    private readonly addVariableRepository: AddVariableRepository
  ) {}

  public async add (variableData: AddVariableModel): Promise<Variable> {
    const variable = await this.loadVariableByKeyConstraintRepository.loadByKeyConstraint({
      key: variableData.key,
      deviceId: variableData.deviceId
    })
    if (variable) {
      return null
    }

    return await this.addVariableRepository.add(variableData)
  }
}

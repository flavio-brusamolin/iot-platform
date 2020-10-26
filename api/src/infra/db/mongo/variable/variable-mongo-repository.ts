import VariableMongoSchema from './variable-mongo-schema'
import VariableMongoMapper from './variable-mongo-mapper'
import { KeyConstraint, LoadVariableByKeyConstraintRepository } from '../../../../data/protocols/db/variable/load-variable-by-key-constraint-repository'
import { Variable } from '../../../../domain/models/variable'
import { AddVariableRepository } from '../../../../data/protocols/db/variable/add-variable-repository'
import { AddVariableModel } from '../../../../domain/use-cases/variable/add-variable'
import { LoadVariablesRepository } from '../../../../data/protocols/db/variable/load-variables-repository'
import { LoadVariableByIdRepository } from '../../../../data/protocols/db/variable/load-variable-by-id-repository'

export class VariableMongoRepository implements LoadVariableByKeyConstraintRepository, AddVariableRepository, LoadVariablesRepository, LoadVariableByIdRepository {
  public async loadByKeyConstraint (keyConstraint: KeyConstraint): Promise<Variable> {
    const variableRecord = await VariableMongoSchema.findOne(keyConstraint)
    return variableRecord && VariableMongoMapper.toEntity(variableRecord)
  }

  public async add (variableData: AddVariableModel): Promise<Variable> {
    const variableRecord = await VariableMongoSchema.create(variableData)
    return VariableMongoMapper.toEntity(variableRecord)
  }

  public async load (deviceId: string): Promise<Variable[]> {
    const variableRecords = await VariableMongoSchema
      .find({ deviceId })
      .select('-data')

    return variableRecords.map(VariableMongoMapper.toEntity)
  }

  public async loadById (variableId: string, ignorableField: string): Promise<Variable> {
    const variableRecord = await VariableMongoSchema
      .findById(variableId)
      .select(ignorableField)

    return VariableMongoMapper.toEntity(variableRecord)
  }
}

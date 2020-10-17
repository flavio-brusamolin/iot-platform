import VariableMongoSchema from './variable-mongo-schema'
import VariableMongoMapper from './variable-mongo-mapper'
import { KeyConstraint, LoadVariableByKeyConstraintRepository } from '../../../../data/protocols/db/variable/load-variable-by-key-constraint-repository'
import { Variable } from '../../../../domain/models/variable'
import { AddVariableRepository } from '../../../../data/protocols/db/variable/add-variable-repository'
import { AddVariableModel } from '../../../../domain/use-cases/variable/add-variable'

export class VariableMongoRepository implements LoadVariableByKeyConstraintRepository, AddVariableRepository {
  public async loadByKeyConstraint (keyConstraint: KeyConstraint): Promise<Variable> {
    const variableRecord = await VariableMongoSchema.findOne(keyConstraint)
    return variableRecord && VariableMongoMapper.toEntity(variableRecord)
  }

  public async add (variableData: AddVariableModel): Promise<Variable> {
    const variableRecord = await VariableMongoSchema.create(variableData)
    return VariableMongoMapper.toEntity(variableRecord)
  }
}

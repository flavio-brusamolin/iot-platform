import joi from 'joi'
import { JoiAdapter } from '../../../../adapters/joi/joi-adapter'

export const makeSendVariableDataValidator = (): JoiAdapter => {
  const schema = joi.object({
    value: joi.number().required()
  })

  return new JoiAdapter(schema)
}

import joi from 'joi'
import { JoiAdapter } from '../../../../adapters/joi/joi-adapter'

export const makeCreateVariableValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(30),
    key: joi.string().required().min(3).max(30)
  })

  return new JoiAdapter(schema)
}

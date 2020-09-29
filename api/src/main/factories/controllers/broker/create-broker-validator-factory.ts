import joi from 'joi'
import { JoiAdapter } from '../../../adapters/joi/joi-adapter'

export const makeCreateBrokerValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(30),
    credentials: joi.object({
      username: joi.string().required().trim(),
      password: joi.string().required().trim(),
      address: joi.string().required().trim(),
      port: joi.number().integer().positive().required()
    }).required()
  })

  return new JoiAdapter(schema)
}

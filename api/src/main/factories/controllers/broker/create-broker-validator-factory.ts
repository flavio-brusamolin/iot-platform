import joi from 'joi'
import { JoiAdapter } from '../../../adapters/joi/joi-adapter'

export const makeCreateBrokerValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().required(),
    credentials: joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
      address: joi.string().required(),
      port: joi.number().required()
    }).required()
  })

  return new JoiAdapter(schema)
}

import joi from 'joi'
import { JoiAdapter } from '../../../../adapters/joi/joi-adapter'
import { Protocol } from '../../../../../domain/enums/protocol'

export const makeUpdateDeviceValidator = (): JoiAdapter => {
  const schema = joi.object({
    name: joi.string().min(3).max(30),
    protocol: joi.string().valid(...Object.values(Protocol)),
    mqttInfo: joi.object({
      topic: joi.string().trim(),
      brokerId: joi.string().trim()
    }).when('protocol', {
      is: Protocol.MQTT,
      then: joi.required()
    })
  })

  return new JoiAdapter(schema)
}

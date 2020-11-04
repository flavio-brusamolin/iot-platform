import { ValidateProtocolRules } from '../../../domain/use-cases/device/validate-protocol-rules'
import { ValidateProtocolRulesRepository } from '../../protocols/db/device/validate-protocol-rules-repository'

export class DbValidateProtocolRules implements ValidateProtocolRules {
  public constructor (private readonly validateProtocolRulesRepository: ValidateProtocolRulesRepository) {}

  public async validate (mqttInfoFromRequest: any, broker: any): Promise<any> {
    if (broker.status === 'Inactive') {
      return null
    }

    const devicesWithSameBrokerId = await this.validateProtocolRulesRepository.validate(mqttInfoFromRequest)
    const hasSameTopics = devicesWithSameBrokerId.find(({ mqttInfo }) => mqttInfo.topic === mqttInfoFromRequest.topic)
    if (hasSameTopics) {
      return null
    }

    return true
  }
}

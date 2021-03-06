import { BrokerStatus } from '../../../domain/enums/broker-status'
import { BusinessRulesValidator } from '../../../domain/use-cases/validation/business-rules-validator'
import { DuplicateFieldError, BrokerStatusNotAcceptedError } from '../../../presentation/errors'
import { LoadBrokerByIdRepository } from '../../protocols/db/broker/load-broker-by-id-repository'
import { LoadDeviceByMqttInfoRepository } from '../../protocols/db/device/load-device-by-mqtt-info-repository'

export class DeviceBusinessRulesValidator implements BusinessRulesValidator {
  public constructor (
    private readonly loadBrokerByIdRepository: LoadBrokerByIdRepository,
    private readonly loadDeviceByMqttInfoRepository: LoadDeviceByMqttInfoRepository
  ) {}

  public async validate ({ mqttInfo }: any, mustValidateBrokerId: boolean): Promise<Error> {
    const broker = await this.loadBrokerByIdRepository.loadById(mqttInfo.brokerId)
    if (broker.status === BrokerStatus.INACTIVE) {
      return new BrokerStatusNotAcceptedError()
    }

    const device = await this.loadDeviceByMqttInfoRepository.loadByMqttInfo(mqttInfo)
    if (device && mustValidateBrokerId) {
      return new DuplicateFieldError('mqttInfo')
    }
  }
}

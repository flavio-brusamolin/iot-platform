import { HandleReceivedData } from '../../../domain/use-cases/mqtt/handle-received-data'
import { InsertVariableDataRepository } from '../../protocols/db/variable/insert-variable-data-repository'
import { LoadVariablesRepository } from '../../protocols/db/variable/load-variables-repository'

export class MqttHandleReceivedData implements HandleReceivedData {
  public constructor (
    private readonly loadVariablesRepository: LoadVariablesRepository,
    private readonly insertVariableDataRepository: InsertVariableDataRepository
  ) {}

  public async handle (deviceId: string, data: Record<string, unknown>): Promise<void> {
    const variables = await this.loadVariablesRepository.load(deviceId)
    const keys = variables.map(({ key }) => key)

    for (const key in data) {
      const value = data[key]

      if (keys.includes(key) && typeof value === 'number') {
        const { id } = variables.find(variable => variable.key === key)

        console.log(`Message received. => Value: ${value} | Key: ${key} | VariableId: ${id} | DeviceId: ${deviceId}`)

        await this.insertVariableDataRepository.insertData(id, {
          timestamp: new Date(),
          value
        })
      }
    }
  }
}

import { SendVariableDataController } from '../../../../../presentation/controllers/variable/send-variable-data-controller'
import { makeSendVariableDataValidator } from './send-variable-data-validator-factory'
import { makeDbCheckMemberPermission } from '../../../use-cases/team/db-check-member-permission-factory'
import { makeDbLoadDeviceById } from '../../../use-cases/device/db-load-device-by-id-factory'
import { makeDbLoadVariableById } from '../../../use-cases/variable/db-load-variable-by-id-factory'
import { makeMqttSendData } from '../../../use-cases/mqtt/mqtt-send-data-factory'

export const makeSendVariableDataController = (): SendVariableDataController => {
  return new SendVariableDataController(
    makeSendVariableDataValidator(),
    makeDbLoadVariableById(),
    makeDbCheckMemberPermission(),
    makeDbLoadDeviceById(),
    makeMqttSendData()
  )
}

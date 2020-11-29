
import { NgModule } from '@angular/core'
import { BrokerService } from './services/broker.service'

import { CollectionService } from './services/collection.service'
import { DeviceService } from './services/device.service'
import { TeamService } from './services/team.service'
import { VariableService } from './services/variable.service'

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    BrokerService,
    CollectionService,
    DeviceService,
    TeamService,
    VariableService
  ]
})
export class DataModule { }

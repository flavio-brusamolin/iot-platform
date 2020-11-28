
import { NgModule } from '@angular/core'
import { BrokerService } from './services/broker.service'

import { CollectionService } from './services/collection.service'
import { DeviceService } from './services/device.service'

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    BrokerService,
    CollectionService,
    DeviceService
  ]
})
export class DataModule { }

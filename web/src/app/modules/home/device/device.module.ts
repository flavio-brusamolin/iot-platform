import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { DeviceRoutingModule } from './device-routing.module'
import { DeviceListComponent } from './page/device-list.component'
import { DeviceCardComponent } from './components/device-card/device-card.component'

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceCardComponent
  ],
  imports: [
    DeviceRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class DeviceModule { }

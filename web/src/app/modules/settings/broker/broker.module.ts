import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { BrokerRoutingModule } from './broker-routing.module'
import { BrokerListComponent } from './page/broker-list.component'
import { BrokerCardComponent } from './components/broker-card/broker-card.component'

@NgModule({
  declarations: [
    BrokerListComponent,
    BrokerCardComponent
  ],
  imports: [
    BrokerRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class BrokerModule { }

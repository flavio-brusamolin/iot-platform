import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { BrokerListComponent } from './page/broker-list.component'

const routes: Routes = [
  {
    path: '',
    component: BrokerListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { DeviceListComponent } from './page/device-list.component'

const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }

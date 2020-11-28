import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full'
  },
  {
    path: 'devices',
    loadChildren: () => import('../device/device.module').then(m => m.DeviceModule)
  },
  {
    path: 'members',
    loadChildren: () => import('../team/team.module').then(m => m.TeamModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionDetailRoutingModule { }

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'collections',
    pathMatch: 'full'
  },
  {
    path: 'collections',
    loadChildren: () => import('./collection/collection.module').then(m => m.CollectionModule)
  },
  {
    path: 'collections/:collectionId',
    loadChildren: () => import('./collection-detail/collection-detail.module').then(m => m.CollectionDetailModule)
  },
  {
    path: 'devices/:deviceId',
    loadChildren: () => import('./device-detail/device-detail.module').then(m => m.DeviceDetailModule)
  },
  {
    path: 'variables/:variableId',
    loadChildren: () => import('./variable-detail/variable-detail.module').then(m => m.VariableDetailModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

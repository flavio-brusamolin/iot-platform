import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'variables',
    pathMatch: 'full'
  },
  {
    path: 'variables',
    loadChildren: () => import('../variable/variable.module').then(m => m.VariableModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceDetailRoutingModule { }

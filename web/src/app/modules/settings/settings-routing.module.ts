import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'brokers',
    pathMatch: 'full'
  },
  {
    path: 'brokers',
    loadChildren: () => import('./broker/broker.module').then(m => m.BrokerModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

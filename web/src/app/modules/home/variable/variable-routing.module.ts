import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { VariableListComponent } from './page/variable-list.component'

const routes: Routes = [
  {
    path: '',
    component: VariableListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariableRoutingModule { }

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { VariableDetailComponent } from './page/variable-detail.component'

const routes: Routes = [
  {
    path: '',
    component: VariableDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VariableDetailRoutingModule { }

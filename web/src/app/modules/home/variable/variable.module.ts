import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { VariableRoutingModule } from './variable-routing.module'
import { VariableListComponent } from './page/variable-list.component'
import { VariableCardComponent } from './components/variable-card/variable-card.component'

@NgModule({
  declarations: [
    VariableListComponent,
    VariableCardComponent
  ],
  imports: [
    VariableRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class VariableModule { }

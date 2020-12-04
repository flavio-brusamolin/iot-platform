import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { VariableDetailRoutingModule } from './variable-detail-routing.module'
import { VariableDetailComponent } from './page/variable-detail.component'
import { InfoCardComponent } from './components/info-card/info-card.component'
import { ChartCardComponent } from './components/chart-card/chart-card.component'
import { HistoryCardComponent } from './components/history-card/history-card.component'

@NgModule({
  declarations: [
    VariableDetailComponent,
    InfoCardComponent,
    ChartCardComponent,
    HistoryCardComponent
  ],
  imports: [
    VariableDetailRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class VariableDetailModule { }

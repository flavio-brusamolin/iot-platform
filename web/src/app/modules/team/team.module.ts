import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { TeamRoutingModule } from './team-routing.module'
import { TeamComponent } from './page/team.component'
import { MemberCardComponent } from './components/member-card/member-card.component'

@NgModule({
  declarations: [
    TeamComponent,
    MemberCardComponent
  ],
  imports: [
    TeamRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class TeamModule { }

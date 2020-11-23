import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionListComponent } from './page/collection-list.component'
import { CollectionCardComponent } from './components/collection-card/collection-card.component'

@NgModule({
  declarations: [
    CollectionListComponent,
    CollectionCardComponent
  ],
  imports: [
    CollectionRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class CollectionModule { }

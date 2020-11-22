import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionListComponent } from './page/collection-list.component'

@NgModule({
  declarations: [
    CollectionListComponent
  ],
  imports: [
    CollectionRoutingModule,

    SharedModule,
    DataModule
  ]
})
export class CollectionModule { }

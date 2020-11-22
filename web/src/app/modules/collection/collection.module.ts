import { NgModule } from '@angular/core'
import { DataModule } from 'src/app/data/data.module'

import { SharedModule } from 'src/app/shared/shared.module'

import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionListComponent } from './page/collection-list.component'

@NgModule({
  declarations: [
    CollectionListComponent
  ],
  imports: [
    CollectionRoutingModule,
    DataModule,
    SharedModule
  ]
})
export class CollectionModule { }

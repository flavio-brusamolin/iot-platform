import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionListComponent } from './page/collection-list.component'

@NgModule({
  declarations: [
    CollectionListComponent
  ],
  imports: [
    CollectionRoutingModule,

    SharedModule
  ]
})
export class CollectionModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxSpinnerModule } from 'ngx-spinner'

import { InputComponent } from './input/input.component'
import { ContainerComponent } from './container/container.component'
import { LoadingComponent } from './loading/loading.component'

@NgModule({
  declarations: [
    InputComponent,
    ContainerComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    NgxSpinnerModule,

    InputComponent,
    ContainerComponent,
    LoadingComponent
  ]
})
export class SharedModule { }

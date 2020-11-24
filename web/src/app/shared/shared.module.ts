import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxSpinnerModule } from 'ngx-spinner'

import { InputComponent } from './input/input.component'
import { ContainerComponent } from './container/container.component'

@NgModule({
  declarations: [
    InputComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    FontAwesomeModule,
    NgxSpinnerModule,

    InputComponent,
    ContainerComponent
  ]
})
export class SharedModule { }

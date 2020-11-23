import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

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

    InputComponent,
    ContainerComponent
  ]
})
export class SharedModule { }

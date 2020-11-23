import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    InputComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

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

    InputComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { SignUpRoutingModule } from './signup-routing.module'
import { SignUpComponent } from './page/signup.component'

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SignUpRoutingModule,

    SharedModule
  ]
})
export class SignUpModule { }

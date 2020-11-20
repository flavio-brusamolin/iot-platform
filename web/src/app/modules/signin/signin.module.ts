import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { SignInRoutingModule } from './signin-routing.module'
import { SignInComponent } from './page/signin.component'

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    SignInRoutingModule,

    SharedModule
  ]
})
export class SignInModule { }

import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { throwIfAlreadyLoaded } from './guards/module-import.guard'
import { AuthService } from './services/auth.service'

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [
    AuthService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}

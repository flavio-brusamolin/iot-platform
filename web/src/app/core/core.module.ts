import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'

import { throwIfAlreadyLoaded } from './guards/module-import.guard'
import { AuthService } from './services/auth.service'
import { NotificationService } from './services/notification.service'
import { AuthGuard } from './guards/auth.guard'
import { TokenInterceptor } from './interceptors/token.interceptor'
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor'

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,

    NgbModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  exports: [
    NgbModule
  ],
  providers: [
    AuthService,
    NotificationService,

    AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}

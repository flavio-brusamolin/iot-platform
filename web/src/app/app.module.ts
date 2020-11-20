import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'

import { CoreModule } from './core/core.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

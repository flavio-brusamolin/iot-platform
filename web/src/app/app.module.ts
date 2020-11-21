import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'

import { CoreModule } from './core/core.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { MainComponent } from './layout/main/main.component'
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component'

@NgModule({
  declarations: [
    AppComponent,

    MainComponent,
    TopNavbarComponent
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

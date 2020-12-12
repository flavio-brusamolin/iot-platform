import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxSpinnerModule } from 'ngx-spinner'
import { ChartsModule } from 'ng2-charts'
import { NgSelectModule } from '@ng-select/ng-select'

import { InputComponent } from './input/input.component'
import { ContainerComponent } from './container/container.component'
import { LoadingComponent } from './loading/loading.component'
import { ErrorComponent } from './error/error.component'
import { EmptyComponent } from './empty/empty.component'
import { ModalComponent } from './modal/modal.component'

@NgModule({
  declarations: [
    InputComponent,
    ContainerComponent,
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    NgbModule,
    FontAwesomeModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    ChartsModule,
    NgSelectModule,

    InputComponent,
    ContainerComponent,
    LoadingComponent,
    ErrorComponent,
    EmptyComponent,
    ModalComponent
  ]
})
export class SharedModule { }

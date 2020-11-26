import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'
import { MainComponent } from './layout/main/main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'collections',
        pathMatch: 'full'
      },
      {
        path: 'collections',
        loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule)
      },
      {
        path: 'settings/mqtt/brokers',
        loadChildren: () => import('./modules/broker/broker.module').then(m => m.BrokerModule)
      }
    ]
  },
  {
    path: 'signin',
    loadChildren: () => import('./modules/signin/signin.module').then(m => m.SignInModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

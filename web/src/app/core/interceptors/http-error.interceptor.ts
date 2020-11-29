import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Router } from '@angular/router'

import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { AuthService } from '../services/auth.service'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  public constructor (
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  public intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && this.router.url !== '/signin') {
        this.authService.signOut()
        this.router.navigate(['/signin'])
      }

      return throwError(error)
    }))
  }
}

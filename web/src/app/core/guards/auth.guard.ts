import { Injectable, OnDestroy } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AuthService } from '../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  private isLoggedIn!: boolean

  private unsub$ = new Subject<void>()

  constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  public canActivate (): boolean {
    this.authService.isLoggedIn()
      .pipe(takeUntil(this.unsub$))
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)

    if (!this.isLoggedIn) {
      this.router.navigate(['/signin'])
      return false
    }

    return true
  }
}

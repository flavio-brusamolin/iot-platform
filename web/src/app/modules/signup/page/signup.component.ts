import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

import { AuthService } from 'src/app/core/services/auth.service'
import { SignUpData } from 'src/app/data/dtos'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form!: FormGroup

  private unsub$ = new Subject<void>()

  public constructor (
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly authService: AuthService
  ) { }

  public ngOnInit (): void {
    this.initializeForms()
  }

  public ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public signUp (userData: SignUpData): void {
    this.authService.signUp(userData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.toastr.success('Welcome to IoT Platform', 'Hello!')
          this.router.navigate(['/'])
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.toastr.error(httpError.error, 'Error!')
        }
      )
  }
}

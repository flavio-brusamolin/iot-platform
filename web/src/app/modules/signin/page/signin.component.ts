import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

import { AuthService } from 'src/app/core/services/auth.service'
import { SignInData } from 'src/app/data/dtos'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
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

  private initializeForms (): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public signIn (credentials: SignInData): void {
    this.authService.signIn(credentials)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.toastr.success('Successful sign in', 'Welcome back!')
          this.router.navigate(['/'])
        },
        ({ error: httpError }: HttpErrorResponse) => {
          console.error(httpError)
          this.toastr.error(httpError.error, 'Error!')
        }
      )
  }
}

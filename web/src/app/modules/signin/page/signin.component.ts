import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SignInData } from 'src/app/data/dtos'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  public form!: FormGroup

  public constructor (private formBuilder: FormBuilder) { }

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
    console.log(credentials)
  }
}

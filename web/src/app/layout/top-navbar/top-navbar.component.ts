import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  public name$!: Observable<string>

  public constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public ngOnInit (): void {
    this.loadUserName()
  }

  private loadUserName (): void {
    this.name$ = this.authService
      .loadLoggedUser()
      .pipe(map(user => user.name))
  }

  public signOut (): void {
    this.authService.signOut()
    this.router.navigate(['/signin'])
  }
}

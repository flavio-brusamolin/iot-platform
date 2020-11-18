import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { environment } from 'src/environments/environment'
import { SignUpData, SignInData, Token, User } from 'src/app/data/models'

@Injectable()
export class AuthService {
  private url = environment.api
  private jwt = new JwtHelperService()

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.validateToken())

  constructor (private http: HttpClient) { }

  isLoggedIn () : Observable<boolean> {
    return this.isLoggedIn$.asObservable()
  }

  signIn (credentials: SignInData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signin`, credentials)
      .pipe(tap(({ accessToken }) => {
        this.setToken(accessToken)
        this.isLoggedIn$.next(true)
      }))
  }

  signUp (userData: SignUpData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signup`, userData)
      .pipe(tap(({ accessToken }) => {
        this.setToken(accessToken)
        this.isLoggedIn$.next(true)
      }))
  }

  signOut (): void {
    this.destroyToken()
    this.isLoggedIn$.next(false)
  }

  loadLoggedUser (): Observable<User> {
    return this.http.get<User>(`${this.url}/me`)
  }

  getToken (): any {
    return localStorage.getItem('accessToken')
  }

  private validateToken (): boolean {
    const accessToken = this.getToken()
    return !this.jwt.isTokenExpired(accessToken)
  }

  private setToken (accessToken: string): void {
    localStorage.setItem('accessToken', accessToken)
  }

  private destroyToken (): void {
    localStorage.removeItem('accessToken')
  }
}

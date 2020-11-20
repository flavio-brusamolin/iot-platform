import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable, BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { JwtHelperService } from '@auth0/angular-jwt'

import { environment } from 'src/environments/environment'
import { SignUpData, SignInData, Token } from 'src/app/data/dtos'
import { User } from 'src/app/data/models'

@Injectable()
export class AuthService {
  private url = environment.api
  private jwt = new JwtHelperService()

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.validateToken())

  constructor (private http: HttpClient) { }

  public isLoggedIn (): Observable<boolean> {
    return this.isLoggedIn$.asObservable()
  }

  public signIn (credentials: SignInData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signin`, credentials)
      .pipe(tap(({ token }) => {
        this.setToken(token)
        this.isLoggedIn$.next(true)
      }))
  }

  public signUp (userData: SignUpData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signup`, userData)
      .pipe(tap(({ token }) => {
        this.setToken(token)
        this.isLoggedIn$.next(true)
      }))
  }

  public signOut (): void {
    this.destroyToken()
    this.isLoggedIn$.next(false)
  }

  public loadLoggedUser (): Observable<User> {
    return this.http.get<User>(`${this.url}/me`)
  }

  public getToken (): any {
    return localStorage.getItem('token')
  }

  private validateToken (): boolean {
    const token = this.getToken()
    return !this.jwt.isTokenExpired(token)
  }

  private setToken (token: string): void {
    localStorage.setItem('token', token)
  }

  private destroyToken (): void {
    localStorage.removeItem('token')
  }
}

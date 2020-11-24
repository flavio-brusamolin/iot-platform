
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Team } from '../models'
import { MemberCreation } from '../dtos'

@Injectable()
export class TeamService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadTeamById (teamId: string): Observable<Team> {
    return this.http.get<Team>(`${this.url}/teams/${teamId}`)
  }

  public addMember (teamId: string, memberData: MemberCreation): Observable<Team> {
    return this.http.post<Team>(`${this.url}/teams/${teamId}/members`, memberData)
  }

  public deleteMember (teamId: string, memberId: string): Observable<Team> {
    return this.http.delete<Team>(`${this.url}/teams/${teamId}/members/${memberId}`)
  }
}

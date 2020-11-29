import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { CompleteTeamData, Team } from '../models'
import { MemberCreationData } from '../dtos'

@Injectable()
export class TeamService {
  private url = environment.api

  public constructor (private readonly http: HttpClient) { }

  public loadTeamById (teamId: string): Observable<CompleteTeamData> {
    return this.http.get<CompleteTeamData>(`${this.url}/teams/${teamId}`)
  }

  public addMember (teamId: string, memberData: MemberCreationData): Observable<Team> {
    return this.http.post<Team>(`${this.url}/teams/${teamId}/members`, memberData)
  }

  public deleteMember (teamId: string, memberId: string): Observable<Team> {
    return this.http.delete<Team>(`${this.url}/teams/${teamId}/members/${memberId}`)
  }
}

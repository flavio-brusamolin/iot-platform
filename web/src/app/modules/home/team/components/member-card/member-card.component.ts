import { Component, Input, OnInit } from '@angular/core'

import { faTrashAlt, faUser, faEnvelope, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { CompleteMemberData } from 'src/app/data/models'

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  public readonly icons = {
    remove: faTrashAlt,
    user: faUser,
    mail: faEnvelope,
    permission: faShieldAlt
  }

  @Input() public member!: CompleteMemberData

  public constructor () { }

  public ngOnInit (): void { }
}
